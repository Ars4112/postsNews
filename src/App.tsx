import { NewsCard } from "./components/newsCard/NewsCard";
import { v4 } from "uuid";
import s from "./App.module.scss";
import { useEffect, useState } from "react";
import { NewsList } from "./utils/createNewsList";
import { Modal } from "./components/modal/Modal";

function App() {
	const [news, setNews] = useState<NewsList[] | null>(null);
	const [currentPost, setCurrentPost] = useState<NewsList | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		const newsList = JSON.parse(localStorage.getItem("newsList") as string);
		setNews(newsList);
	}, []);

	const deletePost = (id: string) => {
		if (!news) return;
		const newList = news.filter((i) => i.id !== id);
		setNews(newList);
		localStorage.setItem("newsList", JSON.stringify(newList));
	};

	const openModal = () => {
		setModalOpen(true);
    const body = document.body
    body.style = 'overflow: hidden'
	};

	const updatePost = (id: string) => {
		if (!news) return;
		const post = news.find((i) => i.id === id);
		if (post) {
			setCurrentPost(post);
			openModal();
		}
	};

	const createPost = () => {
		setCurrentPost(null);
		openModal();
	};
	return (
		<>
			<div className={s.container}>
				<h1>News</h1>
				<ul className={s.cardList}>
					{news?.map((i) => {
						return <NewsCard key={v4()} deletePost={deletePost} updatePost={updatePost} {...i} />;
					})}
				</ul>
				<button className={s.addPost} onClick={createPost}></button>
			</div>
			{modalOpen && <Modal currentPost={currentPost} setModalOpen={setModalOpen} setNews={setNews}/>}
		</>
	);
}

export default App;
