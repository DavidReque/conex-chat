'use client'
import { Button, Input } from "@nextui-org/react";

export default function App() {
  return (
    <form className="m-4">
      <h2 className="text-2xl my-5">Add a friend by E-mail</h2>
      <div className="w-full flex flex-col space-y-4">
        <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 space-x-4">
          <Input type="email" variant="faded" label="Email" color="success" />
          <Button
            className="py-6"
            color="success"
            variant="bordered"
            startContent={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </>
            }
          >
            Add friend
          </Button>
        </div>
      </div>
    </form>
  );
}
