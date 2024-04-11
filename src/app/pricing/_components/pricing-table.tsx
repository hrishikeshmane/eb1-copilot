import React from "react";

const PricingTable = () => {
  return (
    <section className="my-10">
      <div className="mb-10 flex flex-col items-center justify-center">
        <h2 className="mx-auto mb-2 -skew-x-2 text-center text-3xl font-bold md:text-4xl">
          Features by plans
        </h2>
        <p className="mt-0 text-muted-foreground">
          No Contracts. Simple One time fees.
        </p>
      </div>

      <table className="container m-auto rounded shadow-md ">
        <thead className="sticky top-14 block">
          <tr className="flex bg-card text-left">
            <th
              scope="row"
              className=" hidden w-1/4 rounded-tl border border-r-0  p-4 sm:block"
            ></th>
            <th
              scope="col"
              className="w-1/3 border border-r-0  bg-background p-4 font-normal sm:w-1/4"
            >
              <h4 className="u-slab">Intro</h4>
              <p className="hidden text-sm sm:block">Private Q&A for teams</p>
            </th>
            <th
              scope="col"
              className="w-1/3 border border-r-0 bg-background p-4 font-normal sm:w-1/4"
            >
              <h4 className="u-slab">Base</h4>
              <p className="hidden text-sm sm:block">
                Private Q&A with secure single sign-on and premium features for
                your whole organization
              </p>
            </th>
            <th
              scope="col"
              className="w-1/3 rounded-tr border bg-background p-4 font-normal sm:w-1/4"
            >
              <h4 className="u-slab">Popular</h4>
              <p className="hidden text-sm sm:block">
                Your own standalone Q&A community, with enhanced security and
                flexible hosting options
              </p>
            </th>
            <th
              scope="col"
              className="w-1/3 rounded-tr border bg-background p-4 font-normal sm:w-1/4"
            >
              <h4 className="u-slab">Enterprise</h4>
              <p className="hidden text-sm sm:block">
                Your own standalone Q&A community, with enhanced security and
                flexible hosting options
              </p>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="flex text-left">
            <th
              scope="row"
              className="hidden w-1/4 border border-r-0 border-t-0 bg-card p-4 sm:block"
            ></th>
            <th
              scope="col"
              className="flex w-1/3 flex-col border border-r-0 border-t-0 p-4 sm:w-1/4"
            >
              <div className="sm:no-wrap mb-4 flex flex-wrap items-center justify-center sm:justify-start">
                <p className="u-slab text-3xl">$5</p>
                <div className="ml-2 text-xs font-normal">
                  <p className="mt-auto">billed only once</p>
                </div>
              </div>
              <ul className="mb-6 hidden pl-8 text-sm font-normal sm:block">
                <li className="tick mb-2">
                  A single team hosted on stackoverflow.com
                </li>
                <li className="tick mb-2">
                  Unlimited private questions and answers
                </li>
                <li className="tick">Searchable archive</li>
              </ul>
            </th>
            <th
              scope="col"
              className="flex w-1/3 flex-col border border-r-0 border-t-0 p-4 sm:w-1/4"
            >
              <div className="sm:no-wrap mb-4 flex flex-wrap items-center justify-center sm:justify-start">
                <p className="u-slab text-3xl">$11</p>
                <div className="ml-2 text-xs  font-normal">
                  <p>Per user/ month</p>
                  <p>billed anually</p>
                </div>
              </div>
              <ul className="mb-6 hidden pl-8 text-sm font-normal sm:block">
                <li className="tick mb-2">All the features of Basic</li>
                <li className="tick mb-2">Single sign-on (SSO), with SAML</li>
                <li className="tick mb-2">Invoicing</li>
                <li className="tick mb-2">Priority customer support</li>
                <li className="tick mb-2">99.5% uptime</li>
              </ul>
            </th>
            <th
              scope="col"
              className="flex w-1/3 flex-col border border-t-0 p-4 sm:w-1/4"
            >
              <div className="sm:no-wrap mb-4 flex flex-wrap items-center justify-center sm:justify-start">
                <p className="u-slab text-3xl">$17</p>
                <div className="ml-2 text-xs  font-normal">
                  <p>Per user/ month</p>
                  <p>billed anually</p>
                </div>
              </div>
              <ul className="mb-6 hidden pl-8 text-sm font-normal sm:block">
                <li className="tick mb-2">
                  Host on your cloud, your own servers, or our private managed
                  cloud
                </li>
                <li className="tick mb-2">Single sign-on: AD, SAML</li>
                <li className="tick mb-2">Robust Read and Write API</li>
                <li className="tick mb-2">
                  Dedicated Customer Success & Community Building
                </li>
                <li className="tick">99.5% uptime SLA & priority support</li>
              </ul>
            </th>
            <th
              scope="col"
              className="flex w-1/3 flex-col border border-t-0 p-4 sm:w-1/4"
            >
              <div className="sm:no-wrap mb-4 flex flex-wrap items-center justify-center sm:justify-start">
                <p className="u-slab text-3xl">$17</p>
                <div className="ml-2 text-xs  font-normal">
                  <p>Per user/ month</p>
                  <p>billed anually</p>
                </div>
              </div>
              <ul className="mb-6 hidden pl-8 text-sm font-normal sm:block">
                <li className="tick mb-2">
                  Host on your cloud, your own servers, or our private managed
                  cloud
                </li>
                <li className="tick mb-2">Single sign-on: AD, SAML</li>
                <li className="tick mb-2">Robust Read and Write API</li>
                <li className="tick mb-2">
                  Dedicated Customer Success & Community Building
                </li>
                <li className="tick">99.5% uptime SLA & priority support</li>
              </ul>
            </th>
          </tr>
          <tr className="flex text-left">
            <td className="u-slab min-w-full border border-b-0 border-t-0 bg-card p-4 font-bold ">
              Support
            </td>
          </tr>

          <tr className="sm:no-wrap flex flex-wrap text-left text-sm ">
            <th
              scope="col"
              className="flex min-w-full items-center border border-b-0 border-r-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 sm:border-b"
            >
              Web & email support
            </th>
            <td className="flex w-1/5 items-center justify-center border border-r-0  p-4">
              Standard support
            </td>
            <td className="flex w-1/5 items-center justify-center border border-r-0  p-4">
              Priority support
            </td>
            <td className="flex w-1/5 items-center justify-center border p-4 text-center">
              Priority support with dedicated CSM
            </td>
            <td className="flex w-1/5 items-center justify-center border p-4 text-center">
              Priority support with dedicated CSM
            </td>
          </tr>

          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="w-1/5 min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:min-w-0"
            >
              Phone & video support
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4"></td>
            <td className="w-1/5 border border-t-0 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                // className="feather feather-check"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm ">
            <th
              scope="col"
              className="w-1/5 min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:min-w-0"
            >
              Dedicated customer success team
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4"></td>
            <td className="w-1/5 border border-t-0 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm ">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              99.5% uptime SLA
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="w-1/5 min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:min-w-0"
            >
              Dedicated community development program
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>

          <tr className="flex text-left">
            <td className="u-slab min-w-full border border-b-0 border-t-0 bg-card p-4 font-bold ">
              Security & Administration
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm ">
            <th
              scope="col"
              className="flex min-w-full items-center border border-b-0 border-r-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 sm:border-b"
            >
              API
            </th>
            <td className="flex w-1/5 items-center justify-center border border-r-0 p-4 sm:w-1/5">
              Read
            </td>
            <td className="flex w-1/5 items-center justify-center border border-r-0 p-4 sm:w-1/5">
              Read / Write
            </td>
            <td className="flex w-1/5 items-center justify-center border border-r-0 p-4 text-center sm:w-1/5">
              Read / Write
            </td>
            <td className="flex w-1/5 items-center justify-center border p-4 text-center sm:w-1/5">
              Read / Write
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              Analytics
            </th>
            <td className="w-1/3 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              Reporting dashboard
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              Single-team permissions
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 "
            >
              Multi-team permission
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 "
            >
              Single sign-on (SSO)
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 text-center sm:w-1/5">
              SAML
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 text-center sm:w-1/5">
              SAML, AD
            </td>
            <td className="w-1/5 border border-t-0 p-4 text-center sm:w-1/5">
              SAML, AD
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 "
            >
              Invoicing
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>

          <tr className="flex text-left">
            <td className="u-slab min-w-full border border-b-0 border-t-0 bg-card p-4 font-bold">
              Hosting options
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-b-0 border-r-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 sm:border-b"
            >
              Hosted on stackoverflow.com
            </th>
            <td className="w-1/5 border border-r-0 p-4 sm:w-1/5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 p-4 sm:w-1/5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 p-4 sm:w-1/5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border p-4 sm:w-1/5"></td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              Our managed cloud
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              Your cloud
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 "
            >
              Your servers
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>

          <tr className="flex text-left">
            <td className="u-slab min-w-full border border-b-0 border-t-0 bg-card p-4 font-bold">
              Customization
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm ">
            <th
              scope="col"
              className="min-w-full border border-b-0 border-r-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 sm:border-b"
            >
              Logo and colour
            </th>
            <td className="w-1/5 border border-r-0 p-4 sm:w-1/5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0     p-4 sm:w-1/5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border     p-4 sm:w-1/5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border     p-4 sm:w-1/5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              Tags
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0"
            >
              Theme
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 "
            >
              Privileges
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
          <tr className="sm:no-wrap flex flex-wrap text-left text-sm">
            <th
              scope="col"
              className="min-w-full border border-r-0 border-t-0 bg-card p-4 font-normal sm:w-1/5 sm:min-w-0 "
            >
              User help
            </th>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-r-0 border-t-0 p-4 sm:w-1/5"></td>
            <td className="w-1/5 border border-t-0 p-4 text-center sm:w-1/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="m-auto text-indigo-700"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title id="catTitle">
                  Relevant package title ( too many to add )
                </title>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </td>
          </tr>
        </tbody>

        {/* <tfoot>
          <tr className="flex text-left text-sm">
            <td className="hidden w-1/4 border border-r-0 border-t-0     bg-gray-100 p-4 text-center sm:block"></td>
            <td className="w-1/3 border border-r-0 border-t-0     p-4 text-center sm:w-1/4">
              <a
                href=""
                className=" mt-auto block rounded bg-indigo-500 py-2 text-center text-xs font-normal text-white"
                title=""
              >
                Get Started
              </a>
            </td>
            <td className="w-1/3 border border-r-0 border-t-0     p-4 text-center sm:w-1/4">
              <a
                href=""
                className=" mt-auto block rounded bg-indigo-500 py-2 text-center text-xs font-normal text-white"
                title=""
              >
                Request a demo
              </a>
            </td>
            <td className="w-1/3 border border-t-0     p-4 text-center sm:w-1/4">
              <a
                href=""
                className=" rounded-bt mt-auto block rounded bg-indigo-500 py-2 text-center text-xs font-normal text-white"
                title=""
              >
                Request a demo
              </a>
            </td>
          </tr>
        </tfoot> */}
      </table>
    </section>
  );
};

export default PricingTable;
