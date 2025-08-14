import { renderHook, waitFor } from '@testing-library/react';
import { useGetStudentInsights } from '../useGetStudentInsights';


global.fetch = jest.fn();


const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('useGetStudentInsights', () => {
  beforeEach(() => {
    fetch.mockClear();
    console.error.mockClear();
  });

  it('should fetch student insights successfully', async () => {
    const mockStudentData = {
      id: '9bb35f0b-7c90-4b8e-aec1-63dc5aef68f4',
      studentName: 'Jordan Smith',
      gpa: 3.5,
      attendancePercentage: 90,
      creditsEarned: 20,
      creditsRequired: 24,
      notes: 'Mock notes'
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStudentData
    });

    const { result } = renderHook(() => 
      useGetStudentInsights('9bb35f0b-7c90-4b8e-aec1-63dc5aef68f4')
    );

   
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    
    expect(result.current.studentData).toEqual(mockStudentData);
    expect(result.current.error).toBe('');
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/student-insights/9bb35f0b-7c90-4b8e-aec1-63dc5aef68f4'
    );
  });

  it('should handle fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => 
      useGetStudentInsights('9bb35f0b-7c90-4b8e-aec1-63dc5aef68f4')
    );

   
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    
    expect(result.current.studentData).toBe(null);
    expect(result.current.error).toBe('Failed to fetch student data.');
    expect(console.error).toHaveBeenCalledWith(new Error('Network error'));
  });

  it('should not fetch when id is not provided', () => {
    const { result } = renderHook(() => useGetStudentInsights());

    expect(result.current.loading).toBe(false);
    expect(result.current.studentData).toBe(null);
    expect(result.current.error).toBe('');
    expect(fetch).not.toHaveBeenCalled();
  });
});
