import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

interface ProductReviewsSectionProps {
  product: Product;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const { addReview, profile } = useStore();
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState(profile.name);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addReview(product.id, {
        author: author.trim() || 'Brotherhood Member',
        rank: profile.rank,
        rating,
        comment: comment.trim(),
        verifiedBuyer: true
      });
      setComment('');
      setIsSubmitting(false);
      setShowForm(false);
      playAnimusSound('success');
    }, 400);
  };

  const reviews = product.reviews || [];

  return (
    <div className="mt-8 pt-6 border-t border-stone-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-bold text-stone-200 uppercase tracking-wider">
            Verified Brotherhood Reviews ({reviews.length})
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mt-0.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(st => (
                <Star
                  key={st}
                  className={`w-3.5 h-3.5 ${st <= Math.round(product.rating) ? 'fill-current text-amber-400' : 'text-stone-700'}`}
                />
              ))}
            </div>
            <span className="font-bold">{product.rating} out of 5</span>
          </div>
        </div>

        <button
          onClick={() => {
            playAnimusSound('click');
            setShowForm(prev => !prev);
          }}
          className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold"
        >
          {showForm ? 'Cancel' : 'Write Review'}
        </button>
      </div>

      {/* Review Submission Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-black/60 border border-stone-800 space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center justify-between">
            <span className="text-stone-300 font-semibold">Your Rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(st => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setRating(st)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star className={`w-4 h-4 ${st <= rating ? 'fill-current' : 'text-stone-700'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-stone-400 text-[11px] mb-1 font-mono">Your Name / Codename</label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-stone-400 text-[11px] mb-1 font-mono">Review Commentary</label>
            <textarea
              required
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe Damascus steel quality, mechanism smoothness, or delivery speed..."
              className="w-full px-3 py-1.5 rounded bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded bg-red-700 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Verifying...' : 'Submit Verified Review'}</span>
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {reviews.length === 0 ? (
          <p className="text-xs text-stone-500 italic">No reviews logged yet. Be the first to evaluate this armament.</p>
        ) : (
          reviews.map(rev => (
            <div key={rev.id} className="p-3 rounded bg-stone-900/40 border border-stone-800/60 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-200">{rev.author}</span>
                  <span className="text-[10px] font-mono text-amber-500 uppercase">({rev.rank})</span>
                  {rev.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-stone-500 font-mono">{rev.date}</span>
              </div>

              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map(st => (
                  <Star key={st} className={`w-3 h-3 ${st <= rev.rating ? 'fill-current' : 'text-stone-800'}`} />
                ))}
              </div>

              <p className="text-stone-300 text-xs leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
