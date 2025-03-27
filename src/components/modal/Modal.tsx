import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { NewsList } from "../../utils/createNewsList";
import s from "./modal.module.scss";
import { Button } from "../button/Button";
import { v4 } from "uuid";

type Props = {
	currentPost: NewsList | null;
	setModalOpen: (boolean: boolean) => void;
	setNews: (array: NewsList[]) => void;
};

export const Modal = (props: Props) => {
	const { setModalOpen, setNews } = props;
	const [newTitle, setNewTitle] = useState<string>("");
	const [newText, setNewText] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		if (props.currentPost) {
			setNewText(props.currentPost.text);
			setNewTitle(props.currentPost.title);
		}
		const elementFocusArray = document.querySelectorAll("button:not(#modalButton)");
		elementFocusArray.forEach((i) => {
			i.setAttribute("tabIndex", "-1");
		});
	}, []);

	const closeModal = () => {
		setModalOpen(false);
		const body = document.body;
		body.style = "overflow: none";
	};

	const closeModalLayout: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		closeModal();
	};

	const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNewText(e.currentTarget.value.trim());
		setIsError(false);
	};

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value.trim());
		setIsError(false);
	};

	const savePost = () => {
		if (!newTitle || !newText) {
			setIsError(true);
			return;
		}
		const post = props.currentPost;
		const newsList = JSON.parse(localStorage.getItem("newsList") as string);
		if (post) {
			const newObj = {
				id: post.id,
				title: newTitle,
				text: newText,
			};

			const index = [...newsList].findIndex((i) => i.id === post.id);
			newsList.splice(index, 1, newObj);
			localStorage.setItem("newsList", JSON.stringify(newsList));

			setNews(newsList);

			closeModal();

			return;
		}
		const newObj = {
			id: v4(),
			title: newTitle,
			text: newText,
		};

		newsList.push(newObj);

		localStorage.setItem("newsList", JSON.stringify(newsList));

		setNews(newsList);

		closeModal();
	};

	return (
		<>
			<div className={s.layout} onClick={closeModalLayout} />
			<div className={s.modal}>
				<label className={s.label}>
					<span>Title</span>

					<input type="text" value={newTitle} onChange={changeTitle} />
				</label>
				<textarea className={s.textArea} onChange={changeText} value={newText}></textarea>
				<div className={s.buttonWrapper}>
					<Button id={"modalButton"} onClick={savePost}>
						Сохранить
					</Button>
					<Button id={"modalButton"} onClick={closeModal}>
						Закрыть
					</Button>
				</div>
				{isError && <span className={s.isError}>Заполните все поля</span>}
			</div>
		</>
	);
};
