import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import MyTourCard from "@/components/uiComponents/MyTourCard";
import { findMyBooks } from "@/lib/actions/book";

async function page() {
  const booksRes = await findMyBooks();
  const books = (booksRes && JSON.parse(booksRes)) || null;
  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold mb-10">My Tours</h1>
      {books ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[1200px] mx-auto">
          {books.map((item, idx) => (
            <MyTourCard key={idx} item={item} />
          ))}
        </div>
      ) : (
        <ErrorAlert
          description={"Please check your connection and try again."}
        />
      )}
    </div>
  );
}

export default page;
