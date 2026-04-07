export default function Details() {



  return (
    <div className="details">

      <h1 className="det-heading">
        Детали
      </h1>
      <div className="details-el">
        <h2 className="details-heading">Подарки</h2>
        <h3 className="descr-details">
          В качестве подарка будем рады вкладу в бюджет нашей семьи. Он точно поможет воплотить нашу мечту в реальность.
        </h3>
      </div>
      <div className="details-el second-details-el">
        <h2 className="details-heading">Формат мероприятия <br /> 18+</h2>
        <h3 className="descr-details">
          Очень надеемся, что у Вас будет возможность оставить детей дома под присмотром, и полностью погрузиться в атмосферу праздника.
        </h3>
      </div>

      {/* <div className="line"></div> */}

    </div>
  );
}