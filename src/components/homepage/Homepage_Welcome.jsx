// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import "./homepage_welcome.css";
import PropTypes from 'prop-types';
Homepage_Welcome.propTypes = {
};
export default function Homepage_Welcome(props) {
    return(
        <>
            {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center text-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    </div> 
                </div>
            */}
            <div className='text-items-center justify-items-center text-center min-h-screen p-2 bg-fixed background-welcome text-black'>
                <h2 className="font-bold text-2xl mt-10 underline">Selamat Datang</h2>
            </div>
        </>
        
    );
}