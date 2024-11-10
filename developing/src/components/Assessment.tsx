// assessment.js
interface LiterarySource {
  title: string;
  author: string;
  year: number;
  type: 'novel' | 'poem' | 'play' | 'essay';
  domain: 'school' | 'daily' | 'academic';
  themes: string[];
}

// 공개 도메인 문학 작품 데이터베이스
const literarySources: LiterarySource[] = [
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    year: 1884,
    type: 'novel',
    domain: 'daily',
    themes: ['friendship', 'social conventions', 'moral growth']
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    type: 'novel',
    domain: 'school',
    themes: ['social class', 'marriage', 'reputation']
  },
  {
    title: "The Importance of Being Earnest",
    author: "Oscar Wilde",
    year: 1895,
    type: 'play',
    domain: 'academic',
    themes: ['identity', 'social satire', 'marriage']
  }
  // ... 더 많은 작품 추가
];

interface Checkpoint {
  level: 'A' | 'B' | 'C';
  requiredScore: number;
  skills: string[];
  domains: {
    school: number;
    daily: number;
    academic: number;
  };
}

const checkpoints: Record<string, Checkpoint> = {
  A: {
    level: 'A',
    requiredScore: 70,
    skills: ['basic_comprehension', 'context_understanding'],
    domains: {
      school: 0.4,
      daily: 0.4,
      academic: 0.2
    }
  },
  B: {
    level: 'B',
    requiredScore: 80,
    skills: ['metaphor_interpretation', 'character_analysis'],
    domains: {
      school: 0.3,
      daily: 0.3,
      academic: 0.4
    }
  },
  C: {
    level: 'C',
    requiredScore: 90,
    skills: ['literary_analysis', 'cultural_context'],
    domains: {
      school: 0.2,
      daily: 0.2,
      academic: 0.6
    }
  }
};

class AssessmentGenerator {
  private openai: OpenAI;
  private currentCheckpoint: Checkpoint;

  constructor(apiKey: string, initialLevel: 'A' | 'B' | 'C' = 'A') {
    this.openai = new OpenAI({ apiKey });
    this.currentCheckpoint = checkpoints[initialLevel];
  }

  private getSourceForDomain(domain: string, level: string): LiterarySource {
    const appropriate = literarySources.filter(source => 
      source.domain === domain && 
      this.isAppropriateForLevel(source, level)
    );
    return appropriate[Math.floor(Math.random() * appropriate.length)];
  }

  private getPromptTemplate(domain: string, level: string, source: LiterarySource): string {
    const basePrompt = `Create an English assessment question based on the following work:
      Title: ${source.title}
      Author: ${source.author}
      Year: ${source.year}
      
      Level: ${level} (Ontario Grade 10 curriculum)
      Domain: ${domain}
      
      Requirements:
      1. Use a direct quote or passage from the work
      2. Create a question that tests ${this.currentCheckpoint.skills.join(', ')}
      3. Include cultural and historical context when relevant
      4. Provide 4 options for multiple choice
      5. Include detailed explanation for the correct answer
      
      Additional Context:`;

    switch(domain) {
      case 'school':
        return basePrompt + `
          - Focus on classroom discussions and academic interpretation
          - Include relevant vocabulary for school settings
          - Connect to student experiences`;
        
      case 'daily':
        return basePrompt + `
          - Emphasize practical communication
          - Focus on everyday situations and conversations
          - Include common idiomatic expressions`;
        
      case 'academic':
        return basePrompt + `
          - Focus on literary analysis and critical thinking
          - Include historical and cultural context
          - Emphasize formal language and academic vocabulary`;
        
      default:
        return basePrompt;
    }
  }

  private isAppropriateForLevel(source: LiterarySource, level: string): boolean {
    // 레벨별 적합성 판단 로직
    switch(level) {
      case 'A':
        return source.year >= 1850; // 더 현대적인 작품
      case 'B':
        return true; // 모든 작품 사용 가능
      case 'C':
        return source.type === 'play' || source.type === 'poem'; // 더 복잡한 형식
      default:
        return true;
    }
  }

  async generateQuestionForCheckpoint(): Promise<Question> {
    // 현재 체크포인트 레벨에 맞는 문제 생성
    const domain = this.selectDomainForCheckpoint();
    const source = this.getSourceForDomain(domain, this.currentCheckpoint.level);
    const prompt = this.getPromptTemplate(domain, this.currentCheckpoint.level, source);

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert in creating English assessment questions based on classic literature."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      });

      return this.parseResponseToQuestion(
        completion.choices[0].message.content,
        domain,
        this.currentCheckpoint.level,
        source
      );

    } catch (error) {
      console.error('Error generating question:', error);
      throw error;
    }
  }

  private selectDomainForCheckpoint(): string {
    // 체크포인트 도메인 비율에 따른 랜덤 선택
    const rand = Math.random();
    const domains = this.currentCheckpoint.domains;
    
    if (rand < domains.school) return 'school';
    if (rand < domains.school + domains.daily) return 'daily';
    return 'academic';
  }
}