"use client";

import { Card, Button } from "flowbite-react";
import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import MacroMenu from "./MacroMenu";

function Component() {
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </Card>
  );
}

// Define placeholder content for each page
const pageContents = [
  "Welcome to the Learning Module. This is page 1.",
  "Explore more about our topics on page 2.",
  "Detailed insights are provided on page 3.",
  "Page 4 contains advanced content.",
  "Review and summary on page 5.",
];

export function Learn() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex w-full justify-center px-4 py-8">
      <Card className="w-full max-w-4xl">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Learn Section
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here's all you need to know!
        </p>

        <div className="flex flex-col items-center space-y-4">
          <div className="text-lg font-semibold">
            {/* Render content based on current page, fallback to page 1 if out of bounds */}
            {pageContents[currentPage - 1] || pageContents[0]}
          </div>
          <Pagination
            layout="navigation"
            currentPage={currentPage}
            totalPages={pageContents.length} // Set to the number of pages in pageContents
            onPageChange={onPageChange}
          />
        </div>
      </Card>
    </div>
  );
}

export default Learn;
