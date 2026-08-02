export type Question = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  statement: string;
  constraints: string[];
  examples: { input: string; output: string; explanation?: string }[];
  hints: string[];
  starter: Record<string, string>;
};

const genericStarter: Record<string, string> = {
  java: `class Solution {\n    public int solve(int[] nums) {\n        // your code here\n        return 0;\n    }\n}`,
  python: `class Solution:\n    def solve(self, nums):\n        # your code here\n        return 0`,
  cpp: `class Solution {\npublic:\n    int solve(vector<int>& nums) {\n        // your code here\n        return 0;\n    }\n};`,
  c: `int solve(int* nums, int numsSize) {\n    /* your code here */\n    return 0;\n}`,
  javascript: `function solve(nums) {\n  // your code here\n  return 0;\n}`,
};

const fallback: Question = {
  title: "Two Sum of the Ancients",
  difficulty: "Easy",
  statement:
    "The gatekeeper holds an array of enchanted numbers and a target seal. Return the indices of the two numbers whose sum opens the seal. Exactly one valid answer exists, and the same stone may not be used twice.",
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "Only one valid answer exists",
  ],
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "2 + 7 = 9" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ],
  hints: [
    "Brute force is O(n²). The dungeon rewards better.",
    "A hash map trades memory for speed.",
    "For each number, ask: have I already seen target - num?",
  ],
  starter: genericStarter,
};

export const questions: Record<string, Question> = {
  "arrays-q1": fallback,
  "arrays-q2": {
    title: "Maximum Subarray Plunder",
    difficulty: "Medium",
    statement:
      "A caravan of treasures lies in a line, some cursed with negative value. Find the contiguous stretch with the largest total plunder and return that sum.",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] sums to 6" },
    ],
    hints: [
      "Kadane's algorithm walks the array once.",
      "At each step: extend the current run, or start fresh.",
    ],
    starter: genericStarter,
  },
  "strings-q1": {
    title: "Palindrome of the Treant",
    difficulty: "Easy",
    statement:
      "The forest treant speaks only in mirrored words. Given a string, determine whether it reads the same forwards and backwards, ignoring case and non-alphanumeric runes.",
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists of printable ASCII"],
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" },
    ],
    hints: ["Two pointers from both ends.", "Skip characters that are not alphanumeric."],
    starter: genericStarter,
  },
  "recursion-q1": {
    title: "Depths of the Stack Goblin",
    difficulty: "Medium",
    statement:
      "Generate every valid arrangement of n pairs of dungeon gates. A gate arrangement is valid only if every opened gate is eventually closed in order.",
    constraints: ["1 <= n <= 8"],
    examples: [{ input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' }],
    hints: [
      "Backtracking: track open and close counts.",
      "Only close a gate when closes < opens.",
    ],
    starter: genericStarter,
  },
};

export function getQuestion(id: string): Question {
  return questions[id] ?? fallback;
}
