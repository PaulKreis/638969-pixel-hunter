import AbstractView from '../components/abstract-view.js';

export default class ModalconfirmView extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `<section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>
    </section>`;
  }

  onAnswer() { }
}
