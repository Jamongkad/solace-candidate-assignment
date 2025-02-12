/**
 * @jest-environment node
 */
import { GET } from '../route.ts'
import { AdvocateService } from '../service/AdvocateService.ts';

let mockFind = jest.fn();
jest.mock('../service/AdvocateService', () => ({
  AdvocateService: jest.fn().mockImplementation(() => ({
    find: mockFind
  }))
})); // Mock the AdvocateService 

describe('GET /advocates', () => {
  it('should return a list of advocates', async () => {
    const mockAdvocates = [
      { id: 1, name: 'Advocate 1' },
      { id: 2, name: 'Advocate 2' },
    ];

    mockFind.mockResolvedValue({
      data: mockAdvocates,
      count: 10
    });

    const requestObj = {
      nextUrl: {
        searchParams: new URLSearchParams({ limit: '10', offset: '4' }),
      },
    }

    const response = await GET(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      data: mockAdvocates,
      count: 10
    });
  });

  it('should throw error if AdvocateService.find() throws error', async () => {
    mockFind.mockRejectedValue(new Error('Internal Server Error'));

    const requestObj = {
      nextUrl: {
        searchParams: new URLSearchParams({ limit: '10', offset: '4' }),
      },
    }

    try {
      await GET(requestObj);
    } catch (error) {
      expect(error.message).toBe('Error: Internal Server Error');
    }
  });
});
