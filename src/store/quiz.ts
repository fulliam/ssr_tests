import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    questions: [
      {
        question: 'What is your favorite color?',
        answers: [
          { text: 'Red', description: 'A vibrant color', value: false },
          { text: 'Blue', description: 'The color of the sky', value: false },
          { text: 'Green', description: 'Nature`s favorite', value: false }
        ]
      },
      {
        question: 'Do you like ice cream?',
        answers: [
          { text: 'Yes', description: 'I love it!', value: false },
          { text: 'No', description: 'Not really my taste', value: false }
        ]
      },
      {
        question: 'Which animal do you prefer?',
        answers: [
          { text: 'Cats', description: 'Independent and graceful', value: false },
          { text: 'Dogs', description: 'Loyal and energetic', value: false },
          { text: 'Birds', description: 'Free and colorful', value: false }
        ]
      }
    ]
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
    getResults() {
      const results = this.questions.map(question =>
        question.answers.findIndex(answer => answer.value === true)
      );

      const combinations = [
        { combination: [0, 0, 0], result: 'You prefer red, dislike ice cream, and love cats!' },
        { combination: [0, 0, 1], result: 'You prefer red, dislike ice cream, and love dogs!' },
        { combination: [0, 0, 2], result: 'You prefer red, dislike ice cream, and love birds!' },
        { combination: [0, 1, 0], result: 'You prefer red, love ice cream, and love cats!' },
        { combination: [0, 1, 1], result: 'You prefer red, love ice cream, and love dogs!' },
        { combination: [0, 1, 2], result: 'You prefer red, love ice cream, and love birds!' },
        { combination: [1, 0, 0], result: 'You prefer blue, dislike ice cream, and love cats!' },
        { combination: [1, 0, 1], result: 'You prefer blue, dislike ice cream, and love dogs!' },
        { combination: [1, 0, 2], result: 'You prefer blue, dislike ice cream, and love birds!' },
        { combination: [1, 1, 0], result: 'You prefer blue, love ice cream, and love cats!' },
        { combination: [1, 1, 1], result: 'You prefer blue, love ice cream, and love dogs!' },
        { combination: [1, 1, 2], result: 'You prefer blue, love ice cream, and love birds!' },
        { combination: [2, 0, 0], result: 'You prefer green, dislike ice cream, and love cats!' },
        { combination: [2, 0, 1], result: 'You prefer green, dislike ice cream, and love dogs!' },
        { combination: [2, 0, 2], result: 'You prefer green, dislike ice cream, and love birds!' },
        { combination: [2, 1, 0], result: 'You prefer green, love ice cream, and love cats!' },
        { combination: [2, 1, 1], result: 'You prefer green, love ice cream, and love dogs!' },
        { combination: [2, 1, 2], result: 'You prefer green, love ice cream, and love birds!' }
      ];

      const output = combinations.find(
        item => JSON.stringify(item.combination) === JSON.stringify(results)
      );

      return output ? output.result : 'Your preferences are unique and do not fit our conventional categories!';
    },
    resetState() {
      this.questions.forEach(question =>
        question.answers.forEach(answer => answer.value = false)
      );
    }
  }
});
