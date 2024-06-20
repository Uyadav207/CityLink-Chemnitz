import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="border border-white p-4">
        <h1 className="text-center text-2xl lg:text-5xl font-bold bg-gradient-to-r from-black via-black-800 to-blue-200 bg-clip-text text-transparent">
          Facilities
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 mt-8 w-full sm:w-3/4 mx-auto">
          <div
            className={`transition-all duration-200 ease-in-out transform 
               hover:scale-105
             bg-white dark:bg-gray-600 rounded-lg shadow-md hover:shadow-lg overflow-hidden`}
          >
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Schools
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-justify">
                This dataset provides comprehensive information about various
                types of schools in Chemnitz, including primary schools
                (Grundschule), secondary schools (Oberschule), special schools
                (Förderschule), high schools (Gymnasium), and vocational schools
                (Berufsbildende Schule). It includes data on school locations,
                types, and relevant educational facilities.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulen/about"
                target="_blank"
                className="hover:text-white px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 rounded-full"
              >
                Learn more
              </a>
            </div>
          </div>
          <div
            className={`transition-all duration-200 ease-in-out transform 
               hover:scale-105
             bg-white dark:bg-gray-600 rounded-lg shadow-md hover:shadow-lg overflow-hidden`}
          >
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Kindergarden
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300  text-justify">
                This dataset encompasses detailed information about
                kindergartens and daycare centers in Chemnitz, focusing on early
                childhood education facilities. It provides insights into the
                locations, capacities, and types of services offered by these
                institutions. The dataset aims to support parents in finding
                suitable childcare options and helps policymakers plan and
                allocate resources effectively.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::kindertageseinrichtungen/about"
                target="_blank"
                className="hover:text-white px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 rounded-full"
              >
                Learn more
              </a>
            </div>
          </div>
          <div
            className={`transition-all duration-200 ease-in-out transform 
               hover:scale-105
             bg-white dark:bg-gray-600 rounded-lg shadow-md hover:shadow-lg overflow-hidden`}
          >
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Social Child Projects
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300  text-justify">
                The social child projects dataset highlights the services and
                projects aimed at supporting school-aged children through social
                work. It includes information about various initiatives, their
                locations, and the scope of services provided to enhance the
                well-being and development of children.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulsozialarbeit/about"
                target="_blank"
                className=" hover:text-white px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 rounded-full"
              >
                Learn more
              </a>
            </div>
          </div>
          <div
            className={`transition-all duration-200 ease-in-out transform 
               hover:scale-105
             bg-white dark:bg-gray-600 rounded-lg shadow-md hover:shadow-lg overflow-hidden`}
          >
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Social Teenager Projects
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-justify">
                This dataset details projects and initiatives targeting
                teenagers, particularly in the context of vocational support and
                career guidance. It includes information on the programs
                designed to aid teenagers in their professional development and
                integration into the workforce.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::jugendberufshilfen/about"
                target="_blank"
                className="hover:text-white px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 rounded-full"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className="flex">
          Made with
          <FontAwesomeIcon
            icon={faHeart}
            className="animate-pulse w-5 h-5"
            style={{ color: 'red' }}
          />
          by
          <p className="font-bold">Nithin & Utkarsh</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
