import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import MacroMenu from "./MacroMenu";

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
  );
}

export default Learn;
