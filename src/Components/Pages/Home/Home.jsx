import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../features/posts/postSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, posts, error } = useSelector((state) => state.posts);
    const [currentPage, setCurrentPage] = useState(1);
    const perPagePost = 10;

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    // Calculate the posts to display based on currentPage
    const displayedPosts = posts.slice(0, currentPage * perPagePost);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
            </div>

            {/* Loading and Error States */}
            <div className="flex justify-center mb-4">
                {isLoading && <h1 className="text-xl text-blue-600">Loading...</h1>}
                {error && <h1 className="text-xl text-red-600">{error}</h1>}
            </div>

            {/* Posts Display */}
            <div className="flex justify-center">
                <div className="w-full max-w-3xl grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {displayedPosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                            <p className="text-gray-700">{post.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Load More Button */}
            {posts.length > displayedPosts.length && (
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
