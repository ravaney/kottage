import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { database } from "../components/firebase";
import { increment } from "firebase/database";
import { useAuth } from "./contexts/userContext";
import { ref, set } from "firebase/database";
import { v4 } from "uuid";
import "firebase/database";
import TextArea from "antd/es/input/TextArea";

export default function Reviews() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const [reviewId, setReviewId] = useState("");
  const currentDate = new Date();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitReview = async () => {
      await set(ref(database, "reviews/" + reviewId), {
        ownerId: user?.uid,
        Rating: rating,
        Name: user?.displayName,
        Review: review,
        PublishDate: currentDate.toString(),
      });
    };

    submitReview();
    // updateRating();
  };
  const updateRating = async () => {
    await set(
      ref(
        database,
        "ratings/" +
          "ce31b1be-656e-42bc-a44d-75f20230466a" +
          "/" +
          rating +
          "_Star"
      ),
      {
        [rating + "_Star"]: increment(1),
      }
    );
  };
  useEffect(() => {
    rating > 0 ? updateRating() : null;
    setReviewId(v4());
    rating == 0 ? setLoading(true) : setLoading(false);
  }, [rating]);

  //(5*252 + 4*124 + 3*40 + 2*29 + 1*33) / (252+124+40+29+33) = 4.11 and change

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Write your review below</label>
        <TextArea
          required
          id="review"
          style={{ height: "100px" }}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <div>Leave a rating</div>
        <Rating
          max={5}
          required
          value={rating}
          defaultValue={0}
          precision={1}
          icon={
            <FavoriteIcon fontSize="inherit" style={{ color: "hotpink" }} />
          }
          emptyIcon={<FavoriteIcon fontSize="inherit" />}
          onChange={(e, newValue) => {
            newValue ? setRating(newValue) : setRating(0);
            setReviewId(v4());
          }}
        />
        <button variant="primary" type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}
