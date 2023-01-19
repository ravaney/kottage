import React, { useState } from "react";
import { ref, get, set } from "firebase/database";
import { database } from "./firebase";
import { useAuth } from "./contexts/userContext";
export default function UpdateProperty() {
  const { user } = useAuth();

  const [rating, setRating] = useState();

  return (
    <div>
      <form>
        <label htmlFor="rating">Update Rating</label>
        <input
          id="rating"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
