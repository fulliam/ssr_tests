import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    questions: [
      {
        src: './images/question1.jpg',
        alt: 'Вопрос 1',
        question: 'Как вы обычно проводите свой досуг?',
        answers: [
          { text: 'Читаю книги или смотрю фильмы', description: 'Оценка интроверта', value: false, type: 'education' },
          { text: 'Провожу время с друзьями', description: 'Оценка экстраверта', value: false, type: 'teamwork' },
          { text: 'Рисую или пишу', description: 'Оценка эмоциональной личности', value: false, type: 'art' }
        ]
      },
      {
        src: './images/question2.jpg',
        alt: 'Вопрос 2',
        question: 'Если бы вы могли выбрать одну суперспособность, что бы это было?',
        answers: [
          { text: 'Понимать и говорить на всех языках', description: 'Оценка общительной личности', value: false, type: 'teamwork' },
          { text: 'Путешествовать во времени', description: 'Оценка приключенческого духа', value: false, type: 'teamwork' },
          { text: 'Читать мысли', description: 'Оценка эмпатии', value: false, type: 'teamwork' }
        ]
      },
      {
        src: './images/question3.jpg',
        alt: 'Вопрос 3',
        question: 'Какой тип книг вы предпочитаете?',
        answers: [
          { text: 'Фантастика или фэнтези', description: 'Оценка креативной личности', value: false, type: 'teamwork' },
          { text: 'Научная литература', description: 'Оценка аналитического мышления', value: false, type: 'teamwork' },
          { text: 'Биографии или исторические книги', description: 'Оценка реалистичной личности', value: false, type: 'teamwork' }
        ]
      },
      {
        src: './images/question4.jpg',
        alt: 'Вопрос 4',
        question: 'Какой вид спорта вам нравится больше всего?',
        answers: [
          { text: 'Командные игры (футбол, баскетбол)', description: 'Оценка командной работы', value: false, type: 'teamwork' },
          { text: 'Игры с мячом (пинг-понг, теннис)', description: 'Оценка скорости реакции', value: false, type: 'reaction' },
          { text: 'Индивидуальные занятия (бег, плавание)', description: 'Оценка самодисциплины', value: false, type: 'discipline' }
        ]
      },
      {
        src: './images/question5.jpg',
        alt: 'Вопрос 5',
        question: 'Какой ваш любимый жанр музыки?',
        answers: [
          { text: 'Рок', description: 'Оценка независимости', value: false, type: 'independence' },
          { text: 'Поп', description: 'Оценка современности', value: false, type: 'modernity' },
          { text: 'Классика', description: 'Оценка способности ценить искусство', value: false, type: 'art_appreciation' }
        ]
      }
    ],
    result: ''
  }),
  actions: {
    updateAnswer(questionIndex: number, answerIndex: number, value: boolean) {
      this.questions[questionIndex].answers.forEach((answer, i) => {
        if (i === answerIndex) {
          answer.value = value;
        } else {
          answer.value = false;
        }
      });
    },
    async getResults() {
      const questionData = this.questions.map(question => {
        return {
          question: question.question,
          answers: question.answers
        };
      });

      try {
        const response = await axios.post('http://localhost:5050/api/combinations/', questionData);
        const { combinations } = response.data;
        console.log('data', response.data);
        const results = this.questions.map(question =>
          question.answers.findIndex(answer => answer.value === true)
        );

        // Find the matching result
        const output = combinations.find(
          (item: any) => JSON.stringify(item.combination) === JSON.stringify(results)
        );

        if (output) {
          console.log('Matched combination:', output);
          this.result = output.result;
        } else {
          console.log('No matching combination found');
          this.result = 'No matching combination found';
        }

      } catch (error) {
        console.error('Error fetching combinations:', error);
        return 'Error fetching combinations';
      }
    },
    resetState() {
      this.questions.forEach(question =>
        question.answers.forEach(answer => answer.value = false)
      );
    }
  }
});
