import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'quiz',
  state: (): {
    sex: string;
    age: number | null;
    questions: any[];
    result: string;
    showLoader: boolean;
  } => ({
    sex: '',
    age: null,
    questions: [],
    result: '',
    showLoader: true
  }),

  actions: {
    setUserSex(value: string) {
      this.sex = value;
    },

    setUserAge(value: number) {
      this.age = value;
    },

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
          sex: this.sex,
          age: this.age,
          question: question.question,
          answers: question.answers
        };
      });

      try {
        const response = await axios.post('http://192.168.1.126:5050/api/results/', questionData);
        this.result = response.data;
      } catch (error) {
        console.error('Error fetching combinations:', error);
        return 'Error fetching combinations';
      }
    },

    resetState() {
      this.questions.forEach(question =>
        question.answers.forEach(answer => answer.value = false)
      );
      this.sex = '';
      this.age = null;
    }
  }
});
