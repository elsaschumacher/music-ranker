"use client";

import { useState } from "react";
import { rateSong } from "./actions";

export default function Song({ name, id }: { id: string; name: string }) {
  const [rating, setRating] = useState(0);

  const updateRating = async (newRating: number) => {
    await rateSong(id, newRating);
    setRating(newRating);
  };

  return (
    <li className="flex items-center">
      <span>{name}</span>
      <div className="rating rating-md rating-half">
        <input
          type="radio"
          name={id}
          className="rating-hidden"
          checked={rating === 0}
          onChange={() => updateRating(0)}
        />
        <input
          type="radio"
          name={id}
          className="bg-red-400 mask mask-heart mask-half-1"
          checked={rating === 0.5}
          onChange={() => updateRating(0.5)}
        />
        <input
          type="radio"
          name={id}
          className="bg-red-400 mask mask-heart mask-half-2"
          checked={rating === 1}
          onChange={() => updateRating(1)}
        />
        <input
          type="radio"
          name={id}
          className="bg-orange-400 mask mask-heart mask-half-1"
          checked={rating === 1.5}
          onChange={() => updateRating(1.5)}
        />
        <input
          type="radio"
          name={id}
          className="bg-orange-400 mask mask-heart mask-half-2"
          checked={rating === 2}
          onChange={() => updateRating(2)}
        />
        <input
          type="radio"
          name={id}
          className=" bg-yellow-400 mask mask-heart mask-half-1"
          checked={rating === 2.5}
          onChange={() => updateRating(2.5)}
        />
        <input
          type="radio"
          name={id}
          className=" bg-yellow-400 mask mask-heart mask-half-2"
          checked={rating === 3}
          onChange={() => updateRating(3)}
        />
        <input
          type="radio"
          name={id}
          className="bg-lime-400 mask mask-heart mask-half-1"
          checked={rating === 3.5}
          onChange={() => updateRating(3.5)}
        />
        <input
          type="radio"
          name={id}
          className="bg-lime-400 mask mask-heart mask-half-2"
          checked={rating === 4}
          onChange={() => updateRating(4)}
        />
        <input
          type="radio"
          name={id}
          className="bg-green-400 mask mask-heart mask-half-1"
          checked={rating === 4.5}
          onChange={() => updateRating(4.5)}
        />
        <input
          type="radio"
          name={id}
          className="bg-green-400 mask mask-heart mask-half-2"
          checked={rating === 5}
          onChange={() => updateRating(5)}
        />
      </div>
    </li>
  );
}
