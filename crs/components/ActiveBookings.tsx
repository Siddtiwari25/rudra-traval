// src/components/ActiveBookings.tsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Ticket, Trash2 } from 'lucide-react';
import { Booking } from '../types';

interface ActiveBookingsProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function ActiveBookings({ isOpen, onClose, bookings, onCancelBooking }: ActiveBookingsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-xl font-black text-slate-800">My Trip Ledger</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{bookings.length} active reservation(s)</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Bookings list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400 font-semibold text-sm">No travel bookings yet.</p>
                  <p className="text-xs text-slate-300 mt-1">Start searching and confirm a trip to see it here.</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-700 px-2 py-0.5 rounded">
                            {booking.type}
                          </span>
                          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            {booking.status}
                          </span>
                          {booking.code && (
                            <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                              Ref: {booking.code}
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-sm leading-snug">{booking.provider}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">{booking.routeDetails}</p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </span>
                          <span className="font-black text-slate-700">{booking.price}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="shrink-0 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                        title="Cancel booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer note */}
            <div className="p-5 border-t border-slate-200 bg-slate-50">
              <p className="text-[10px] text-slate-400 text-center font-medium">
                All bookings are simulated for demo purposes.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}