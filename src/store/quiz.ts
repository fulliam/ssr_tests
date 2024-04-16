import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    questions: [],
    result: ''
  }),
  actions: {
    async getQuestions() {
      try {
        const response = await axios.get('http://192.168.1.126:5050/api/questions/');
        this.questions = response.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },

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
        const response = await axios.post('http://192.168.1.126:5050/api/combinations/', questionData);
        const { combinations } = response.data;
        console.log('data', response.data);
        const results = this.questions.map(question =>
          question.answers.findIndex(answer => answer.value === true)
        );

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
