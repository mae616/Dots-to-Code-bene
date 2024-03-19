'use client';
import { Hearts } from 'react-loader-spinner';

export default function LoadingAnimation({loading}) {

    return (
        <>
            {loading && 
                <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-10">
                    <div className="bg-white h-32 w-36 rounded-lg flex flex-col justify-center items-center">
                    <Hearts
                        height="80"
                        width="80"
                        color="#f472b6"
                        ariaLabel="hearts-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={loading}
                    />
                    <div className="text-sm text-slate-500">loading...</div>
                </div>
            </div>}
        </>
    );
};
