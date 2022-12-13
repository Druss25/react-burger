How to Convert SVGs to React Components
https://www.freecodecamp.org/news/how-to-import-svgs-in-react-and-vite/


26-28 сентября – теория + тренажер (модули «Основы React» и «Инструментарий»)
29 сентября - 1 октября – написание промежуточного проекта (вёрстка, заготовка CRA)
2-4 октября – теория + тренажер (Продвинутый React, Хуки)
5 октября – вебинар «Кастомные хуки»
5–7 октября – написание проекта (JSX)
8-9 октября – ревью и исправление ошибок


Figma - макет
https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0%3A1


Воспользуйтесь нашим готовым набором компонентов для бургерной.
https://www.npmjs.com/package/@ya.praktikum/react-developer-burger-ui-components


React Developer Burger UI Components
https://yandex-praktikum.github.io/react-developer-burger-ui-components/docs/


Музыка
https://music.yandex.ru/users/music-blog/playlists/2131


Проект. Создать CRA-заготовку и создать структуру папок под компоненты
https://practicum.yandex.ru/learn/react/courses/8bb9f1d2-104b-4854-a4d5-d5d8766421ec/sprints/35950/topics/1b04cf53-64d6-46a0-ba92-2a857b20f0bd/lessons/a4bdfad8-d4c2-4b5b-aefa-04119daf305d/


export const getOrder = (requestData: any) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    });

    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ ingredients: requestData }),
    });

    if (res.ok) {
      const { order } = await res?.json();
      console.log(order);
      dispatch({
        type: OrderActionTypes.ORDER_SUCCESS,
        payload: order,
      });
    } else {
      dispatch({
        type: OrderActionTypes.ORDER_FAILED,
        payload: "Ошибка в получение данных с сервера",
      });
    }
  };
};


export const getOrderByNumber = (number: number) => {
  return fetch('https://norma.nomoreparties.space/api/orders/${number}', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse<TOrderResponse>(res));
};

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { JOIN_CHAT, JOIN_CHAT_FAILED, JOIN_CHAT_SUCCESS } from '../action-types';

export const joinChat = () => dispatch => {
  dispatch({
    type: JOIN_CHAT
  });
  fetch('https://chat.nomoreparties.space/join')
    .then(res => res.json())
    .then(data => {
      const { success, ...userData } = data;
      if (success) {
        dispatch({
          type: JOIN_CHAT_SUCCESS,
          user: userData
        });
      } else {
        dispatch({
          type: JOIN_CHAT_FAILED
        });
      }
    });
};
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
