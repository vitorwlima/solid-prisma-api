import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackMock = jest.fn()
const sendMailMock = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  {
    create: createFeedbackMock
  },
  {
    sendMail: sendMailMock
  }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        comment: 'test comment',
        type: 'BUG',
        screenshot: 'data:image/png;base64dsa0d7asdh6as'
      })
    ).resolves.not.toThrow()

    expect(createFeedbackMock).toHaveBeenCalled()
    expect(sendMailMock).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        comment: 'test comment',
        type: ''
      })
    ).rejects.toThrow('Type is required.')
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        comment: '',
        type: 'BUG'
      })
    ).rejects.toThrow('Comment is required.')
  })

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        comment: 'test comment',
        type: 'BUG',
        screenshot: 'test.jpg'
      })
    ).rejects.toThrow('Invalid screenshot format.')
  })
})
