import React from 'react';
import ReportDesigner from './ReportDesigner';
//mport { Provider } from 'react-redux';
//import ReportDesigner from './ReportDesigner';
//import store from './redux/store';

/*const App = () => (
    <Provider store={ store }>
        <ReportDesigner />
    </Provider>
)*/

const App = () => (
    <div className="flex flex-col h-full flex-1">
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
        <div className="w-full flex flex-1 justify-between">
            <div className="bg-grey-lighter p-3 shadow" style={ { width: 500 } }>
                <div className="rounded border border-grey-light bg-white mb-5">
                    <h4 className="p-3 font-medium border-b border-grey-light bg-white">
            Genel Fatura Öğeleri
                    </h4>
                    <p className="p-4 border-b border-grey-light font-thin text-sm">
            Fatura öğelerini sürükleyip sayfada istediğiniz yere
            bırakabilirsiniz.
                    </p>
                    <button className="p-2 bg-grey-lighter w-full text-grey cursor-not-allowed text-black  border-b border-grey-lighter text-sm outline-none">
            Müşteri Ünvanı
                    </button>

                    <button className="hover:bg-grey-lighter p-2 bg-grey-lightest w-full text-black border-b border-grey-lighter text-sm outline-none">
            Müşteri Adresi
                    </button>

                    <button className="hover:bg-grey-lighter p-2 bg-grey-lightest w-full text-black border-b border-grey-lighter text-sm outline-none">
            Müşteri Adresi
                    </button>
                </div>

                <div className="rounded border border-grey-light bg-white mb-5">
                    <h4 className="p-3 font-medium border-b border-grey-light bg-white">
            Genel Fatura Öğeleri
                    </h4>
                </div>
            </div>
            <div className="bg-grey-lighter  p-3 w-full overflow-y-scroll">
                <ReportDesigner />
            </div>
            <div className="bg-grey-lightest shadow  p-3" style={ { width: 600 } } />
        </div>
        <footer className="w-full text-center border-t border-grey p-4">
      This is our footer
        </footer>
    </div>
);

export default App;
