import React from "react";
import Logo from "./logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 border-t ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 flex flex-col gap-2 md:mb-0">
            <Logo />
            {/* <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-left">
              3100 Mowry Ave, Fremont, CA 94538
            </span> */}
            {/* <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-left">
              info@greencard.inc | +1 (415) 654-0685
            </span> */}
            <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              © {`${new Date().getUTCFullYear()} `}
              <Link href="https://greencard.inc/" className="hover:underline">
                Greencard Inc
              </Link>
              . All Rights Reserved.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {/* <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Resources
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://www.unshackled.club/newsletter"
                    className="hover:underline"
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div> */}
            {/* <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Follow us
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/greencard_inc/"
                    className="hover:underline "
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div> */}
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Legal
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/document/d/e/2PACX-1vST6ifdC_kKPBd2e7rfqWvQ-p7E3Z3HWSv7dtHQUg6gp59eYgz69MHIQQ_3R8FcCZGyHecv8dEQonhV/pub"
                    className="hover:underline "
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/document/d/e/2PACX-1vSw3SRmlDvRTKsLwvMnGoJpimqIgqw2wBrkZojnQBDDAr4KiFKpYT6sQtvBGnghqA/pub"
                    className="hover:underline"
                  >
                    Data Processing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/document/d/e/2PACX-1vS5K4eFlPI4T2pzljQ9nnGdL3a54rjcrMCpiPK4xZOI2dww80M6Z8gD0GXmt-6yODX1eHamfdGWZu7L/pub"
                    className="hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/document/d/e/2PACX-1vSSbZI_rXtlwkJZ10A2JM5PsVL99MSzMOpkX41DOjNhxp_OGxpMSHSaqrin9aw-rK8QPWZgXv-9C2pI/pub"
                    className="hover:underline"
                  >
                    Saas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" /> */}
        {/* <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex sm:mt-0 sm:justify-center">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div> */}
        <p className="mx-auto w-full py-2 text-center text-xs text-muted-foreground">
          Disclaimer: Greencard Inc is not a law firm and does not provide legal
          advice. All content on our platform—including programs, webinars,
          emails, and documents—is for general informational purposes only.
          Participating in Greencard Inc does not create an attorney-client
          relationship. For legal matters, please consult a qualified
          immigration attorney or official U.S. government resources.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
