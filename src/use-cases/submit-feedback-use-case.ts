import { MailAdapter } from '../adapters/mail-adapter'
import { FeedbacksRepository } from '../repositories/feedbacks-repository'
import { HttpException } from '../error-handler'

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository, private mailAdapter: MailAdapter) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new HttpException('Type is required.', 422)
    }

    if (!comment) {
      throw new HttpException('Comment is required.', 422)
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new HttpException('Invalid screenshot format.', 422)
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: `
        <div>
          <p>Tipo do feedback: ${type}</p>
          <p>Comentário: ${comment}</p>
        </div>
      `
    })
  }
}
