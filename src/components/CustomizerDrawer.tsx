import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, Check, Code2, User, Gift, Upload } from 'lucide-react';
import { RelationshipConfig } from '../types';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: RelationshipConfig;
  onUpdateData: (newData: RelationshipConfig) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
}) => {
  const [activeTab, setActiveTab] = useState<'names' | 'surprise' | 'guide'>('names');
  const [formData, setFormData] = useState<RelationshipConfig>(data);

  const handleSave = () => {
    onUpdateData(formData);
    onClose();
  };

  const handleSurprisePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData({
      ...formData,
      finalSurprise: {
        ...(formData.finalSurprise || {
          image: 'assets/us-final.jpg',
          teaserTitle: 'I made one more thing for you.',
          buttonText: 'Open ❤️',
          messageBlocks: [],
          signoff: '— Yours always,',
          optionalClosingLines: [],
        }),
        image: url,
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-lg bg-[#120A14] border-l border-white/10 h-full flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[#E8A598]" />
                <h3 className="text-lg font-serif-cormorant font-normal text-[#F5EBE1]">
                  Personalize Experience
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#EADECB] hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 px-4 bg-black/20 text-xs font-sans-jakarta overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('names')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'names'
                    ? 'border-[#B83358] text-[#FFF5EB] font-medium'
                    : 'border-transparent text-[#EADECB]/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Names
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('surprise')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'surprise'
                    ? 'border-[#B83358] text-[#FFF5EB] font-medium'
                    : 'border-transparent text-[#EADECB]/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#E8A598]" />
                  Final Surprise
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'guide'
                    ? 'border-[#B83358] text-[#FFF5EB] font-medium'
                    : 'border-transparent text-[#EADECB]/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Guide
                </span>
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 overflow-y-auto flex-grow space-y-6 text-sm text-[#EADECB]">
              {activeTab === 'names' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8A598] mb-1.5 font-sans-jakarta">
                      Her Name / Nickname
                    </label>
                    <input
                      type="text"
                      value={formData.girlfriendName}
                      onChange={(e) =>
                        setFormData({ ...formData, girlfriendName: e.target.value })
                      }
                      placeholder="e.g. Elena, My Love"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#B83358]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8A598] mb-1.5 font-sans-jakarta">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.myName}
                      onChange={(e) => setFormData({ ...formData, myName: e.target.value })}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#B83358]"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-[#EADECB]/60 font-light leading-relaxed">
                      💡 Tip: You can customize all letter contents, commitments, and constellation stars directly in <code className="text-[#E8A598]">src/relationshipData.ts</code>.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'surprise' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8A598] mb-1.5 font-sans-jakarta">
                      Final Photograph
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.finalSurprise?.image || 'assets/us-final.jpg'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            finalSurprise: {
                              ...(formData.finalSurprise || {
                                image: 'assets/us-final.jpg',
                                teaserTitle: 'I made one more thing for you.',
                                buttonText: 'Open ❤️',
                                messageBlocks: [],
                                signoff: '— Yours always,',
                                optionalClosingLines: [],
                              }),
                              image: e.target.value,
                            },
                          })
                        }
                        placeholder="assets/us-final.jpg or image URL"
                        className="w-full px-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#B83358]"
                      />
                      <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#EADECB] cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#E8A598]" />
                        <span>Upload Our Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSurprisePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8A598] mb-1.5 font-sans-jakarta">
                      Teaser Headline
                    </label>
                    <input
                      type="text"
                      value={
                        formData.finalSurprise?.teaserTitle ||
                        'I made one more thing for you.'
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          finalSurprise: {
                            ...(formData.finalSurprise || {
                              image: 'assets/us-final.jpg',
                              teaserTitle: 'I made one more thing for you.',
                              buttonText: 'Open ❤️',
                              messageBlocks: [],
                              signoff: '— Yours always,',
                              optionalClosingLines: [],
                            }),
                            teaserTitle: e.target.value,
                          },
                        })
                      }
                      placeholder="I made one more thing for you."
                      className="w-full px-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#B83358]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8A598] mb-1.5 font-sans-jakarta">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.finalSurprise?.buttonText || 'Open ❤️'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          finalSurprise: {
                            ...(formData.finalSurprise || {
                              image: 'assets/us-final.jpg',
                              teaserTitle: 'I made one more thing for you.',
                              buttonText: 'Open ❤️',
                              messageBlocks: [],
                              signoff: '— Yours always,',
                              optionalClosingLines: [],
                            }),
                            buttonText: e.target.value,
                          },
                        })
                      }
                      placeholder="Open ❤️"
                      className="w-full px-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#B83358]"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'guide' && (
                <div className="space-y-4 text-xs leading-relaxed text-[#EADECB]/80">
                  <div className="p-4 rounded-xl bg-[#3C0D1B]/30 border border-[#B83358]/30">
                    <h4 className="font-medium text-[#FFF5EB] mb-2 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-[#E8A598]" /> How to customize your files:
                    </h4>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>
                        <strong>1. Final Photo:</strong> Place your couple photograph at <code className="text-[#E8A598]">assets/us-final.jpg</code> or upload it directly.
                      </li>
                      <li>
                        <strong>2. Names:</strong> Update <code className="text-[#E8A598]">girlfriendName</code> and <code className="text-[#E8A598]">myName</code> in <code className="text-[#E8A598]">src/relationshipData.ts</code>.
                      </li>
                      <li>
                        <strong>3. Apology & Letters:</strong> Edit <code className="text-[#E8A598]">apologyLetter</code> and <code className="text-[#E8A598]">deepLetter</code>.
                      </li>
                      <li>
                        <strong>4. Commitments:</strong> Update the 5 commitments in the <code className="text-[#E8A598]">commitments</code> array.
                      </li>
                      <li>
                        <strong>5. Constellation Stars:</strong> Customize the messages attached to each star in the <code className="text-[#E8A598]">constellation</code> array.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 bg-black/40">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs text-[#EADECB]/60 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2.5 rounded-full bg-[#B83358] hover:bg-[#D93D6B] text-white text-xs font-medium tracking-wide flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Apply Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
