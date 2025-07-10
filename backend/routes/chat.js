import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI client with API key from environment
let openai = null;

// Function to create OpenAI client
const createOpenAIClient = () => {
  if (process.env.OPENAI_API_KEY) {
    try {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      console.log('✅ OpenAI client created successfully');
      return true;
    } catch (error) {
      console.log('❌ Error creating OpenAI client:', error.message);
      return false;
    }
  } else {
    console.log('❌ OpenAI API key not found in environment variables');
    return false;
  }
};

// Try to create client immediately
createOpenAIClient();

// POST /api/chat - Handle chat messages
router.post('/', async (req, res) => {
  try {
    console.log('🤖 Chat request received:', {
      hasOpenAI: !!openai,
      hasMessage: !!req.body.message,
      messageLength: req.body.message?.length || 0
    });

    if (!openai) {
      console.log('🔄 OpenAI client not available, attempting to recreate...');
      if (!createOpenAIClient()) {
        console.log('❌ OpenAI client still not available');
        return res.status(503).json({ 
          error: 'OpenAI service is not configured. Please check your environment variables.' 
        });
      }
    }

    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      console.log('❌ Invalid message format:', { message, type: typeof message });
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }

    console.log('🤖 Processing chat message:', message.substring(0, 50) + '...');

    // Check if message is company-related
    const companyKeywords = [
      'supe ai', 'company', 'business', 'service', 'product', 'solution', 'ai', 'artificial intelligence',
      'automation', 'technology', 'enterprise', 'workflow', 'process', 'multilingual', 'real-time',
      'customer', 'support', 'implementation', 'integration', 'pricing', 'features', 'capabilities',
      'industry', 'sector', 'consultation', 'partnership', 'about', 'contact', 'team', 'office',
      'project', 'deployment', 'training', 'maintenance', 'upgrade', 'customization', 'api',
      'dashboard', 'analytics', 'reporting', 'security', 'compliance', 'scalability', 'performance'
    ];

    const isCompanyRelated = companyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );

    console.log('🔍 Message analysis:', { isCompanyRelated, message: message.toLowerCase() });

    if (!isCompanyRelated) {
      console.log('📝 Returning company-only message');
      const assistantMessage = {
        role: 'assistant',
        content: "I'm Supe AI's company assistant. I can only help with questions related to Supe AI, our services, products, business operations, or AI solutions. Please ask me about our company, services, or how we can help your business!"
      };
      return res.json({ 
        reply: assistantMessage.content,
        model: "gpt-4o-mini",
        usage: { total_tokens: 0 }
      });
    }

    console.log('🚀 Calling OpenAI API...');

    // Call OpenAI API for company-related questions
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Supe AI's company assistant. You ONLY respond to questions about Supe AI company, our services, products, business operations, AI solutions, or how we can help businesses. If someone asks about anything else (personal questions, general knowledge, other topics), politely redirect them to ask about Supe AI or our services. Be professional, friendly, and helpful. Keep responses concise but informative. Always stay focused on Supe AI business topics."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

    console.log('✅ Chat response generated successfully:', {
      model: completion.model,
      usage: completion.usage,
      replyLength: reply.length
    });

    res.json({ 
      reply,
      model: completion.model,
      usage: completion.usage
    });

  } catch (error) {
    console.error('❌ Chat API error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      type: error.constructor.name
    });
    
    // Handle specific OpenAI errors
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'Invalid OpenAI API key' 
      });
    }
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'OpenAI API quota exceeded' 
      });
    }

    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: 'OpenAI API rate limit exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router; 