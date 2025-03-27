import { NewsList } from "../../utils/createNewsList";
import { Button } from "../button/Button";
import s from "./newsCard.module.scss";

type Props = {
	deletePost: (id: string) => void;
	updatePost: (id: string) => void;
} & NewsList;

export const NewsCard = (props: Props) => {
	const { id, title, text, deletePost, updatePost } = props;

	return (
		<div className={s.container}>
			<h2 className={s.title}>{title}</h2>
			<div className={s.cardWrapper}>
				<div>
					<div className={s.img}></div>
					<p className={s.text}>{text}</p>
				</div>
			</div>
			<div className={s.buttonWrapper}>
				<Button onClick={() => deletePost(id)} type="button">
					Удалить
				</Button>
				<Button onClick={() => updatePost(id)} type="button">
					Редактировать
				</Button>
			</div>
		</div>
	);
};
