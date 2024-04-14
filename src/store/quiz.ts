import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    questions: [
      {
        src: './images/chechick.jpg',
        alt: 'Чечик это нейтрал',
        question: 'What is...  <br/><span style="background-color: #9721c2; width: min-content; padding: 7px; margin: 7px; display: flex; align-self: start; border: 2px solid black;">...your</span> favorite color?',
        answers: [
          { text: 'Red', description: 'A vibrant color', value: false },
          { text: 'Blue', description: 'The color of the sky', value: false },
          { text: 'Green', description: 'Nature`s favorite', value: false }
        ]
      },
      {
        src: './images/masik.jpg',
        alt: 'Масик это ',
        question: 'Do <span style="background-color: #fd4868; width: min-content; padding: 7px; margin: 7px; display: flex; align-self: start; border: 2px solid black;">you</span> like ice cream?',
        answers: [
          { text: 'Yes', description: 'I love it!', value: false },
          { text: 'No', description: 'Not really my taste', value: false }
        ]
      },
      {
        src: './images/shtrikh.jpg',
        alt: 'Штрих это ',
        question: 'Which animal do <span style="background-color: #fde948; width: min-content; padding: 7px; margin: 7px; display: flex; align-self: start; border: 2px solid black;">you</span> prefer?',
        answers: [
          { text: 'Cats', description: 'Independent and graceful', value: false },
          { text: 'Dogs', description: 'Loyal and energetic', value: false },
          { text: 'Birds', description: 'Free and colorful', value: false }
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
