"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Review } from "@prisma/client";

import { useCurrentUser } from "@/hooks/use-current-user";
import getProgress from "@/action-server/get-progress";
import { FcLock } from "react-icons/fc";

const ratingMeaning = [
  "Very Poor 😞",
  "Poor 😕",
  "Average 😐",
  "Good 🙂",
  "Excellent 😃",
];

const ReviewCreation = ({
  courseId,
  reviews,
}: {
  courseId: string;
  reviews: Review | null;
}) => {
  const router = useRouter();
  const [rating, setRating] = useState<any>(null);
  const [hover, setHover] = useState<any>(null);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser();

  const onSubmit = async () => {
    try {
      const { percentageCompleted } = await getProgress(
        String(user?.id),
        courseId
      );

      setIsLoading(true);
      if (!user) {
        return toast.error("Sign in to be able to make a review", {
          icon: <FcLock size={20} />,
        });
      }

      if (percentageCompleted !== 100) {
        return toast.error("Complete this course to be able to make a review");
      }

      if (!rating || !review) {
        return toast.error("You have not completed the review");
      }

      if (reviews) {
        return toast.error("You have already made a review on this course");
      }

      await axios.post(`/api/courses/${courseId}/reviews`, {
        rating: rating,
        ratingDescription: ratingMeaning[rating - 1],
        review: review,
      });

      toast.success("Your review has been received");
      router.refresh();
    } catch {
      toast.error("Something went Wrong");
    } finally {
      setIsLoading(false);
      setReview("");
      setRating(null);
    }
  };
  return (
    <>
      <div>
        <h2 className="text-lg font-semibold font-poppins">Add a review</h2>
        <div className="flex flex-col gap-3  my-2">
          <p className="text-sm ">How was the course?</p>
          <div className="gap-1 flex">
            {[...Array(5)].map((star, index) => {
              const current = index + 1;
              return (
                <label>
                  <input
                    className="hidden"
                    type="radio"
                    name="rating"
                    value={current}
                    onClick={() => setRating(current)}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`w-5 h-5 cursor-pointer ${
                      current <= (hover || rating)
                        ? "text-ranking"
                        : "text-grey"
                    }`}
                    onMouseEnter={() => setHover(current)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            <p className="mx-5 text-primary font-semibold">
              {rating !== null && ratingMeaning[rating - 1]}
            </p>
          </div>
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
          className="border border-grey rounded-lg outline-none my-2 p-4 w-full h-[120px]"
        ></textarea>
        <Button onClick={onSubmit} disabled={isLoading}>
          Submit Review
        </Button>
      </div>
    </>
  );
};

export default ReviewCreation;
