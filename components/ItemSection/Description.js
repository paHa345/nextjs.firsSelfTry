import styles from "./Description.module.css";

function Description(props) {
  return (
    <div className={styles.itemDescriptionTextElement}>
      <h3>Описание</h3>
      <p className={styles.descriptionText}>{props.description}</p>
      <p className={styles.descriptionText}>{props.description}</p>
      <p className={styles.descriptionText}>{props.description}</p>
    </div>
  );
}

export default Description;
