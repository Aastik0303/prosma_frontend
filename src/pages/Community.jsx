import React, { useState } from 'react';
import { 
  Users, Award, Flame, MessageSquare, Send, ChevronRight, 
  Sparkles, CheckCircle2, AlertCircle, Bookmark, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Community({ leaderboard }) {
  const [activeForum, setActiveForum] = useState('web-dev'); // 'web-dev' | 'ai-ml' | 'embedded'
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  // Mock forums dataset
  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      category: 'web-dev',
      author: 'Aastik Srivastava',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=facearea&facepad=2&w=256&h=256&q=80',
      title: 'Should I learn Zustand or Redux ToolKit for complex dashboards?',
      body: 'I am compiling my Next.js Bento Grid portfolio. State updates are highly nested because of real-time widgets. What state managers are hiring managers scanning for?',
      likes: 14,
      liked: false,
      replies: [
        { author: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=256&h=256&q=80', text: "For modern startup environments, Zustand is highly preferred due to its low boilerplate overhead. List 'Zustand State managers' on your technical keywords!" }
      ]
    },
    {
      id: 2,
      category: 'ai-ml',
      author: 'Pranav Mistry',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=256&h=256&q=80',
      title: 'QLoRA fine-tuning Llama-3 memory requirements',
      body: 'I am bidding on an AI gig that requires absorbing corporate standard drafts. Can I execute a Llama-3 QLoRA fine-tune on a single local RTX 4090 card?',
      likes: 9,
      liked: false,
      replies: [
        { author: 'Vikram Malhotra', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=256&h=256&q=80', text: "Yes! Utilizing 4-bit quantizations (BitsAndBytes) you can easily fine-tune Llama-3 inside ~16GB of VRAM. It fits perfectly on your local RTX 4090!" }
      ]
    }
  ]);

  const handlePostSubmit = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      category: activeForum,
      author: "You (Explorer)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=facearea&facepad=2&w=256&h=256&q=80",
      title: postText.slice(0, 50) + (postText.length > 50 ? '...' : ''),
      body: postText,
      likes: 0,
      liked: false,
      replies: []
    };
    setForumPosts([newPost, ...forumPosts]);
    setPostText('');
  };

  const handleCommentSubmit = (postId) => {
    if (!commentText.trim()) return;
    
    const updated = forumPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              author: "You (Explorer)",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=facearea&facepad=2&w=256&h=256&q=80",
              text: commentText
            }
          ]
        };
      }
      return post;
    });

    setForumPosts(updated);
    
    // Also update selected post so modal updates
    const matched = updated.find(p => p.id === postId);
    if (matched) setSelectedPost(matched);
    
    setCommentText('');
  };

  const handleLike = (postId, e) => {
    e.stopPropagation();
    const updated = forumPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    setForumPosts(updated);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Grid: Leaderboard & Forums */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Columns (2/3): Leaderboard Rankings */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-6 text-left">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                <Award className="w-5.5 h-5.5 text-indigo-500 animate-bounce" />
                Global XP Leaderboard
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Rankings calculated by learning accomplishments & daily streak thresholds.</span>
            </div>

            {/* Challenge pill */}
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-500/10 px-3 py-1.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Weekly Multiplier Active!
            </span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map(student => (
              <div 
                key={student.rank} 
                className={`p-3 rounded-2xl flex items-center justify-between border transition-all ${
                  student.rank === 1 
                    ? 'bg-gradient-to-r from-amber-500/5 to-amber-500/0 border-amber-500/20' 
                    : student.rank === 2
                      ? 'bg-gradient-to-r from-slate-400/5 to-slate-400/0 border-slate-300/20'
                      : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-805'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank circle */}
                  <div className={`w-7 h-7 rounded-full font-extrabold text-xs flex items-center justify-center shrink-0 ${
                    student.rank === 1 ? 'bg-amber-500 text-white shadow shadow-amber-500/20' :
                    student.rank === 2 ? 'bg-slate-350 text-slate-900' :
                    student.rank === 3 ? 'bg-amber-700 text-white' :
                    'bg-slate-205 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {student.rank}
                  </div>

                  <img 
                    src={student.avatar} 
                    alt={student.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200/50"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white leading-tight flex items-center gap-1.5 text-sm">
                      {student.name}
                      {student.rank === 1 && <span className="text-amber-500 text-xs">👑</span>}
                    </h4>
                    <span className="text-[10px] text-brand-primary dark:text-brand-accent font-bold mt-0.5 block">{student.badge}</span>
                  </div>
                </div>

                <div className="flex gap-4 sm:gap-6 items-center font-bold text-xs text-slate-500 dark:text-slate-455">
                  <div className="flex items-center gap-1 text-amber-550">
                    <Flame className="w-4 h-4 fill-current text-amber-500" />
                    <span>{student.streak}d</span>
                  </div>
                  <span className="text-slate-900 dark:text-white text-sm font-extrabold">{student.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Active Community Challenge cards */}
        <div className="glass-panel p-6 rounded-3xl space-y-6 text-left">
          <h3 className="font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            Cohort Challenges
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-105/50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-805 rounded-xl space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[8px] font-extrabold px-3.5 py-0.5 rounded-bl uppercase">
                Active
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white pr-8">Link GitHub to Resume Center</h4>
              <p className="text-[10px] text-slate-500 leading-normal">Interface your account to fetch profile evaluations. Unlocks priority placement referrals.</p>
              <div className="flex justify-between items-center pt-2 font-bold text-[10px] text-indigo-500 border-t border-slate-200/40 dark:border-slate-800/30">
                <span>Reward: +100 XP</span>
                <span>Open Scanner</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-105/50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-805 rounded-xl space-y-2 opacity-60">
              <h4 className="font-bold text-slate-900 dark:text-white">Pass 3 Web Dev checkpoints</h4>
              <p className="text-[10px] text-slate-500 leading-normal">Solve assessments along the vertical learning path. Boosts resume keyword score.</p>
              <div className="flex justify-between items-center pt-2 font-bold text-[10px] text-slate-400 border-t border-slate-200/40 dark:border-slate-800/30">
                <span>Completed</span>
                <span>Claimed (+150 XP)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Discussion Forums Board Widget */}
      <div className="glass-panel p-6 rounded-3xl space-y-6 text-left">
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-slate-800/40 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              Technical Peer Review Board
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Post project roadmaps or code bugs for student feedback.</p>
          </div>

          {/* Forum category selectors */}
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-bold">
            <button 
              onClick={() => setActiveForum('web-dev')}
              className={`px-4 py-1.5 rounded-lg transition-all ${activeForum === 'web-dev' ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Web Dev
            </button>
            <button 
              onClick={() => setActiveForum('ai-ml')}
              className={`px-4 py-1.5 rounded-lg transition-all ${activeForum === 'ai-ml' ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              AI & ML
            </button>
            <button 
              onClick={() => setActiveForum('embedded')}
              className={`px-4 py-1.5 rounded-lg transition-all ${activeForum === 'embedded' ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Embedded
            </button>
          </div>
        </div>

        {/* Input box to compile post */}
        <div className="flex gap-3">
          <input 
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostSubmit()}
            placeholder={`Draft a new technical inquiry inside active folder /${activeForum}...`}
            className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-white"
          />
          <button 
            onClick={handlePostSubmit}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
          >
            Post Thread <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Threads list */}
        <div className="space-y-4">
          {forumPosts.filter(p => p.category === activeForum).map(post => (
            <div 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="p-4 bg-slate-105/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-805 rounded-2xl cursor-pointer hover:bg-slate-105/60 dark:hover:bg-slate-905/60 transition-all text-xs"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={post.avatar} 
                    alt={post.author} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white leading-tight">{post.title}</h4>
                    <span className="text-[10px] text-slate-450 mt-0.5 block">Authored by {post.author}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-normal mb-4 font-medium">
                {post.body}
              </p>

              <div className="flex gap-4 items-center font-bold text-[10px] text-slate-455 pt-3 border-t border-slate-200/30 dark:border-slate-800/20">
                <button 
                  onClick={(e) => handleLike(post.id, e)}
                  className={`flex items-center gap-1 hover:text-red-500 transition-colors ${post.liked ? 'text-red-500' : ''}`}
                >
                  <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                  <span>{post.likes} Likes</span>
                </button>

                <span className="flex items-center gap-1 text-slate-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.replies.length} replies</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Threads Reply Slide Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white dark:bg-darknavy-card w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-slate-250 dark:border-slate-805 shadow-xl relative max-h-[85vh] overflow-y-auto"
            >
              
              {/* Close button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-455 transition-colors"
              >
                <span className="text-xl font-bold">&times;</span>
              </button>

              <div className="space-y-6 text-left text-xs">
                {/* Main thread post details */}
                <div className="pb-4 border-b border-slate-200 dark:border-slate-850">
                  <div className="flex gap-2.5 items-center mb-3">
                    <img 
                      src={selectedPost.avatar} 
                      alt={selectedPost.author} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-950 dark:text-white mt-0.5">
                        {selectedPost.title}
                      </h3>
                      <span className="text-[10px] text-slate-450">Posted by {selectedPost.author} inside /{selectedPost.category}</span>
                    </div>
                  </div>
                  <p className="text-slate-655 dark:text-slate-350 leading-relaxed font-medium">
                    {selectedPost.body}
                  </p>
                </div>

                {/* Replies list */}
                <div className="space-y-3.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">Replies & Reviews</h4>
                  
                  {selectedPost.replies.map((rep, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex gap-3 items-start">
                      <img 
                        src={rep.avatar} 
                        alt={rep.author} 
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div className="leading-relaxed">
                        <span className="font-bold text-slate-900 dark:text-white block">{rep.author}</span>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{rep.text}</p>
                      </div>
                    </div>
                  ))}

                  {selectedPost.replies.length === 0 && (
                    <div className="text-slate-400 text-center py-4 flex gap-1 items-center justify-center">
                      <AlertCircle className="w-4.5 h-4.5" /> No reviews posted yet. Be the first to answer!
                    </div>
                  )}
                </div>

                {/* Reply Form */}
                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-805 flex gap-2">
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(selectedPost.id)}
                    placeholder="Type your peer review comment..."
                    className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-white"
                  />
                  <button 
                    onClick={() => handleCommentSubmit(selectedPost.id)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl font-bold text-xs"
                  >
                    Reply
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
