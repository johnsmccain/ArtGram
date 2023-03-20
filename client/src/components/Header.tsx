import { Link } from 'react-router-dom';

const Header = ({ heading, paragraph, linkName, linkUrl = '#' }: any) => {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img
                    className='h-14 w-14'
                    alt='Remove this text'
                    src="" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                {heading}
            </h2>
            <p className='mt-2 text-center text-md text-white mt-5'>
                {paragraph} {'  '}
                <Link to={linkUrl} className='font-medium text-purple-600 hover:text-purple-500'>
                    {linkName}
                </Link>
            </p>
        </div >
    );
};

export default Header;
