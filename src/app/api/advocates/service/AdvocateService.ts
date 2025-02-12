import { AdvocateRepository } from "../database/AdvocateRepository";

export class AdvocateService {
  private repository: AdvocateRepository;

  constructor() {
    this.repository = new AdvocateRepository();
  }

  async find(limit: number, offset: number) {
    return this.repository.find(limit, offset);
  }
}