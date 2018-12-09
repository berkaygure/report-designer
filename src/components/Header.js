import React from 'react';

const Header = () => (
  <header>
    <nav className="flex items-center justify-between flex-wrap bg-blue-dark p-3 shadow">
      <div className="flex items-center flex-no-shrink  text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Report Editor
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a className="block mt-4 lg:inline-block lg:mt-0 t text-white hover:text-white mr-4">
            Docs
          </a>
        </div>
        <div>
          <a className="inline-block text-sm px-4 py-2 leading-none border rounded  text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">
            Download
          </a>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
