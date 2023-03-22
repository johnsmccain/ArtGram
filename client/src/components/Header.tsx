import { Link } from 'react-router-dom';

const Header = ({ heading, paragraph, linkName, linkUrl = '#' }: any) => {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img
                    className='h-14 w-14 rounded-lg'
                    alt='logo'
                    src="https://firebasestorage.googleapis.com/v0/b/artgram-project.appspot.com/o/artGram.png?alt=media&token=855dc4ec-a302-4d8f-9078-c5ec0abe3035" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                {heading}
            </h2>
            <p className='mt-2 text-center text-md text-white mt-5'>
                {paragraph} {'  '}
                <Link to={linkUrl} className='font-medium text-blue-600 hover:text-blue-300'>
                    {linkName}
                </Link>
            </p>
        </div >
    );
};

export default Header;
