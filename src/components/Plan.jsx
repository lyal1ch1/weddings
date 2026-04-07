import Photo1 from "../assets/Photo1.jpg";
import Photo2 from "../assets/rings.jpg";
import Photo3 from "../assets/Photo2.jpg";
import Photo4 from "../assets/Photo4.jpg";
import Photo5 from "../assets/Photo5.jpg";

import StrLeft from "../assets/left-um.svg";
import StrRight from "../assets/right-um.svg";

export default function Plan() {

  const planData = [
    {
      time: "14:30",
      title: "Сбор гостей",
      descr: "Встречаемся, знакомимся и настраиваемся на душевную свадьбу",
      photo: Photo1
    },
    {
      time: "15:00",
      title: "Церемония",
      descr: "Вы станете свидетелями того, как мы скажем друг другу \"да\"",
      photo: Photo2
    },
    {
      time: "15:30",
      title: "Фуршет",
      descr: "Общаемся, угощаемся и ловим красивые моменты",
      photo: Photo3
    },
    {
      time: "16:30",
      title: "Банкет",
      descr: "От души посмеемся, повеселимся и сделаем этот вечер незабываемым",
      photo: Photo4
    },
    {
      time: "22:30",
      title: "Окончание мероприятия",
      descr: "Даже такой прекрасный вечер может закончиться",
      photo: Photo5
    }
  ];

  return (
    <div className="plan">
      <div className="line"></div>

      <h1 className="plan-heading">
        План мероприятия
      </h1>

      {planData.map((item, index) => {
        const isLeft = index % 2 === 0;
        const isLast = index === planData.length - 1; // проверяем, последний ли элемент

        return (
          <div
            className={`plan-element ${isLeft ? "left" : "right"}`}
            key={index}
          >
            <img src={item.photo} alt="photo" className="photo-el" />

            <h2 className="time-element">
              {item.time} {item.title}
            </h2>

            <h3 className="descr-element">
              {item.descr}
            </h3>

            {/* Стрелку рендерим только если элемент не последний */}
            {!isLast && (
              <img
                src={isLeft ? StrRight : StrLeft}
                alt="arrow"
                className={`arrow ${isLeft ? "arrow-right" : "arrow-left"}`}
              />
            )}
          </div>
        );

      })}
      <div className="line"></div>

    </div>
  );
}