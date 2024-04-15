"use client";

import { Card, Button } from "flowbite-react";
import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import MacroMenu from "./MacroMenu";

// Define placeholder content for each page
const pageComponents = [
  <MacroMenu />,
  <div>Explore more about our topics on page 2.</div>,
  <div>Detailed insights are provided on page 3.</div>,
  <div>Page 4 contains advanced content.</div>,
  <div>Review and summary on page 5.</div>,
];

export function Learn() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageContent = (pageIndex: number) => {
    // Ensuring the page index is within the bounds of the pageComponents array
    return pageComponents[pageIndex - 1] || pageComponents[0];
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
            {renderPageContent(currentPage)}
          </div>
          <Pagination
            layout="navigation"
            currentPage={currentPage}
            totalPages={pageComponents.length} // Set to the number of pages in pageContents
            onPageChange={onPageChange}
          />
        </div>
      </Card>
    </div>
  );
}

export default Learn;
