"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SKIN        = "#C8956E";
const SKIN_SHADE  = "#A87040";
const SKIN_DARK   = "#8A5A28";
const HAIR        = "#1C1410";
const HAIR_MED    = "#2E2016";
const HOODIE      = "#100C1C";
const HOODIE_MID  = "#1C1632";
const HOODIE_LT   = "#241E3A";
const EYE_WHITE   = "#EDE8DF";
const SILVER      = "#C8C8D6";
const INK         = "#4840C0";
const INK_DK      = "#302890";

export default function AvatarCharacter() {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => { setBlink(false); loop(); }, 140);
      }, 2800 + Math.random() * 2400);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  const eyeH = blink ? 1.5 : 13;

  return (
    <motion.div
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-sm mx-auto select-none"
    >
      {/* Glow orb */}
      <div aria-hidden style={{
        position: "absolute", inset: "-10%",
        background: "radial-gradient(ellipse 70% 60% at 50% 62%, rgba(124,58,237,0.65) 0%, rgba(80,40,200,0.2) 48%, transparent 72%)",
        filter: "blur(32px)", pointerEvents: "none", zIndex: 0,
      }} />

      <svg viewBox="0 0 380 460" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 1, width: "100%", overflow: "visible" }}
        aria-label="Avatar Ezra Torres">
        <defs>
          <radialGradient id="sg" cx="42%" cy="36%" r="60%">
            <stop offset="0%"   stopColor="#DCA878" />
            <stop offset="50%"  stopColor={SKIN} />
            <stop offset="100%" stopColor={SKIN_DARK} />
          </radialGradient>
          <radialGradient id="hg" cx="50%" cy="28%" r="72%">
            <stop offset="0%"   stopColor={HOODIE_MID} />
            <stop offset="100%" stopColor={HOODIE} />
          </radialGradient>
          <radialGradient id="eg" cx="35%" cy="32%" r="62%">
            <stop offset="0%"   stopColor="#4A3420" />
            <stop offset="100%" stopColor="#1E1408" />
          </radialGradient>
          {/* Clip so body doesn't overflow canvas */}
          <clipPath id="canvas"><rect width="380" height="460"/></clipPath>
        </defs>

        <g clipPath="url(#canvas)">

          {/* ── BODY / HOODIE ──────────────────────────────────────── */}
          <path
            d="M -10,460 L -10,348 Q -10,316 36,298 L 110,274 Q 148,262 168,257 L 190,255 L 212,257 Q 232,262 270,274 L 344,298 Q 390,316 390,348 L 390,460 Z"
            fill="url(#hg)"
          />
          {/* Center seam / hood opening */}
          <path
            d="M 168,257 Q 178,277 190,283 Q 202,277 212,257 L 208,298 Q 199,314 190,315 Q 181,314 172,298 Z"
            fill="#0E0A1A"
          />
          {/* Kangaroo pocket */}
          <path
            d="M 145,355 Q 141,344 148,340 L 232,340 Q 239,344 235,355 L 235,400 Q 235,408 227,408 L 153,408 Q 145,408 145,400 Z"
            fill="#0C0818"
          />
          <path d="M 145,355 Q 141,344 148,340 L 232,340 Q 239,344 235,355"
            fill="none" stroke={HOODIE_LT} strokeWidth="1.2" />
          {/* Drawstrings */}
          <line x1="180" y1="283" x2="174" y2="340" stroke={HOODIE_LT} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="200" y1="283" x2="206" y2="340" stroke={HOODIE_LT} strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="174" cy="343" rx="4"  ry="5" fill="#28203C"/>
          <ellipse cx="206" cy="343" rx="4"  ry="5" fill="#28203C"/>
          {/* Shoulder highlight */}
          <path d="M 36,300 Q 80,282 110,276" fill="none" stroke={HOODIE_MID} strokeWidth="2" opacity="0.6"/>
          <path d="M 344,300 Q 300,282 270,276" fill="none" stroke={HOODIE_MID} strokeWidth="2" opacity="0.6"/>

          {/* ── SLEEVES ────────────────────────────────────────────── */}
          <path d="M -10,400 Q -10,356 36,342 L 96,320 Q 120,312 128,324 L 96,460 L -10,460 Z" fill={HOODIE}/>
          <path d="M 390,400 Q 390,356 344,342 L 284,320 Q 260,312 252,324 L 284,460 L 390,460 Z" fill={HOODIE}/>

          {/* Arm tattoo hints */}
          <g opacity="0.48" transform="translate(14,362)">
            <circle cx="26" cy="18" r="14" fill="none" stroke={INK} strokeWidth="2"/>
            <path d="M 19,7 Q 26,1 33,7 Q 26,15 19,7" fill={INK}/>
            <path d="M 7,22 Q 15,15 15,24 Q 10,27 7,22" fill={INK}/>
            <path d="M 45,22 Q 37,15 37,24 Q 42,27 45,22" fill={INK}/>
            <line x1="26" y1="32" x2="26" y2="50" stroke={INK} strokeWidth="1.8"/>
            <path d="M 26,38 Q 14,33 12,23 Q 20,29 26,38" fill={INK} opacity="0.75"/>
          </g>
          <g opacity="0.48" transform="translate(340,362) scale(-1,1)">
            <circle cx="26" cy="18" r="14" fill="none" stroke={INK} strokeWidth="2"/>
            <path d="M 19,7 Q 26,1 33,7 Q 26,15 19,7" fill={INK}/>
            <path d="M 7,22 Q 15,15 15,24 Q 10,27 7,22" fill={INK}/>
            <path d="M 45,22 Q 37,15 37,24 Q 42,27 45,22" fill={INK}/>
            <line x1="26" y1="32" x2="26" y2="50" stroke={INK} strokeWidth="1.8"/>
            <path d="M 26,38 Q 14,33 12,23 Q 20,29 26,38" fill={INK} opacity="0.75"/>
          </g>

          {/* ── NECK ───────────────────────────────────────────────── */}
          <path d="M 168,264 Q 163,280 163,304 Q 165,316 190,318 Q 215,316 217,304 Q 217,280 212,264 Z"
            fill="url(#sg)"/>
          <path d="M 168,264 Q 164,282 166,302 L 180,301 Q 175,282 173,264 Z"
            fill={SKIN_DARK} opacity="0.2"/>

          {/* Neck tattoo — rose (his RIGHT = viewer's LEFT) */}
          <g transform="translate(102,270)" opacity="0.9">
            <path d="M 23,2 Q 35,13 23,26 Q 11,13 23,2" fill={INK}/>
            <path d="M 38,15 Q 27,26 13,23 Q 16,8 38,15" fill={INK}/>
            <path d="M 8,15 Q 19,26 33,23 Q 30,8 8,15" fill={INK}/>
            <path d="M 35,30 Q 23,21 23,36 Q 33,33 35,30" fill={INK}/>
            <path d="M 11,30 Q 23,21 23,36 Q 13,33 11,30" fill={INK}/>
            <circle cx="23" cy="17" r="7" fill={INK_DK}/>
            <circle cx="23" cy="17" r="3.5" fill={INK} opacity="0.55"/>
            <line x1="23" y1="36" x2="23" y2="55" stroke={INK} strokeWidth="2.2"/>
            <path d="M 23,41 Q 12,36 10,26" stroke={INK} strokeWidth="1.5" fill="none"/>
            <path d="M 23,48 Q 34,43 36,33" stroke={INK} strokeWidth="1.5" fill="none"/>
            <path d="M 23,41 Q 10,36 8,24 Q 18,31 23,41" fill={INK} opacity="0.7"/>
            <path d="M 23,49 Q 36,44 38,32 Q 28,39 23,49" fill={INK} opacity="0.7"/>
          </g>

          {/* ── HEAD ───────────────────────────────────────────────── */}
          <ellipse cx="190" cy="178" rx="88" ry="92" fill="url(#sg)"/>
          <ellipse cx="128" cy="202" rx="22" ry="17" fill={SKIN_SHADE} opacity="0.12"/>
          <ellipse cx="252" cy="202" rx="22" ry="17" fill={SKIN_SHADE} opacity="0.12"/>

          {/* ── EARS ───────────────────────────────────────────────── */}
          {/* Left ear */}
          <path d="M 104,166 Q 92,180 92,196 Q 92,212 104,220 L 111,220 Q 100,211 100,196 Q 100,180 111,166 Z"
            fill={SKIN}/>
          <path d="M 104,178 Q 98,194 100,208" stroke={SKIN_DARK} strokeWidth="2" fill="none" opacity="0.3"/>
          {/* Right ear (earring side) */}
          <path d="M 276,166 Q 288,180 288,196 Q 288,212 276,220 L 269,220 Q 280,211 280,196 Q 280,180 269,166 Z"
            fill={SKIN}/>
          <path d="M 276,178 Q 282,194 280,208" stroke={SKIN_DARK} strokeWidth="2" fill="none" opacity="0.3"/>

          {/* ── EARRING hoop ───────────────────────────────────────── */}
          <circle cx="280" cy="222" r="11" fill="none" stroke={SILVER} strokeWidth="3.5"/>
          <path d="M 271,215 Q 269,222 271,229" stroke="#E8E8F8" strokeWidth="1.5" fill="none" opacity="0.6"/>

          {/* ── HAIR — undercut fade + quiff ───────────────────────── */}
          {/*
              Strategy: skin is visible on sides (fade effect).
              Hair only covers the CROWN/TOP (above the hairline).
              Hairline runs: ~(138,150) → (190,134) → (242,150) across the top of face.
              Side fade = thin dark strips near ear tops, fading to skin.
          */}

          {/* Side fade strips (short stubble on sides) */}
          <path d="M 104,158 Q 112,132 132,114 Q 120,140 114,168 Z"
            fill={HAIR} opacity="0.72"/>
          <path d="M 276,158 Q 268,132 248,114 Q 260,140 266,168 Z"
            fill={HAIR} opacity="0.72"/>

          {/* Crown hair — covers top of skull only */}
          <path
            d="M 138,150 Q 136,110 156,88 Q 170,72 190,68 Q 210,72 224,88 Q 244,110 242,150 Q 224,138 190,134 Q 156,138 138,150 Z"
            fill={HAIR}
          />
          {/* Quiff volume — front lift */}
          <path
            d="M 152,144 Q 155,108 172,88 Q 182,76 190,74 Q 198,76 208,88 Q 225,108 228,144 Q 214,132 190,129 Q 166,132 152,144 Z"
            fill={HAIR}
          />
          {/* Hair internal highlight — shows texture/direction */}
          <path
            d="M 175,85 Q 188,74 200,80 Q 190,75 175,85 Z"
            fill={HAIR_MED} opacity="0.6"
          />
          <path
            d="M 168,100 Q 180,82 196,82 Q 182,84 168,100 Z"
            fill={HAIR_MED} opacity="0.45"
          />
          {/* Hairline definition — where hair meets forehead */}
          <path
            d="M 138,150 Q 158,136 190,132 Q 222,136 242,150"
            fill={HAIR} stroke={HAIR} strokeWidth="1"
          />

          {/* ── EYEBROWS — thick, dark, slightly arched ─────────────── */}
          <path d="M 140,158 Q 153,148 175,151 Q 166,146 152,148 Q 143,151 140,158 Z" fill={HAIR}/>
          <path d="M 240,158 Q 227,148 205,151 Q 214,146 228,148 Q 237,151 240,158 Z" fill={HAIR}/>
          {/* Brow body thickness */}
          <path d="M 142,157 Q 152,151 172,153" fill="none" stroke={HAIR} strokeWidth="5" strokeLinecap="round"/>
          <path d="M 238,157 Q 228,151 208,153" fill="none" stroke={HAIR} strokeWidth="5" strokeLinecap="round"/>

          {/* ── EYES ───────────────────────────────────────────────── */}
          {/* Shadow sockets */}
          <ellipse cx="157" cy="183" rx="22" ry="16" fill={SKIN_DARK} opacity="0.16"/>
          <ellipse cx="223" cy="183" rx="22" ry="16" fill={SKIN_DARK} opacity="0.16"/>

          {/* Left eye */}
          <ellipse cx="157" cy="182" rx="17" ry={eyeH} fill={EYE_WHITE}/>
          {!blink && <>
            <circle cx="159" cy="182" r="10" fill="url(#eg)"/>
            <circle cx="159" cy="182" r="5.5" fill="#0C0804"/>
            <circle cx="156" cy="179" r="2.5" fill="white" opacity="0.8"/>
          </>}
          {/* Top eyelid crease */}
          <path d="M 140,179 Q 158,171 176,179" fill="none" stroke={SKIN} strokeWidth="3.5" strokeLinecap="round"/>
          {/* Lash line */}
          <path d="M 141,178 Q 158,172 175,178" fill="none" stroke={HAIR} strokeWidth="1.5" opacity="0.7"/>

          {/* Right eye */}
          <ellipse cx="223" cy="182" rx="17" ry={eyeH} fill={EYE_WHITE}/>
          {!blink && <>
            <circle cx="225" cy="182" r="10" fill="url(#eg)"/>
            <circle cx="225" cy="182" r="5.5" fill="#0C0804"/>
            <circle cx="222" cy="179" r="2.5" fill="white" opacity="0.8"/>
          </>}
          <path d="M 206,179 Q 224,171 242,179" fill="none" stroke={SKIN} strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 207,178 Q 224,172 241,178" fill="none" stroke={HAIR} strokeWidth="1.5" opacity="0.7"/>

          {/* ── NOSE ───────────────────────────────────────────────── */}
          <path d="M 186,197 Q 182,215 180,225 Q 182,234 190,236 Q 198,234 200,225 Q 198,215 194,197"
            fill="none" stroke={SKIN_DARK} strokeWidth="1.5" opacity="0.32"/>
          <ellipse cx="183" cy="234" rx="7" ry="5" fill={SKIN_SHADE} opacity="0.38"/>
          <ellipse cx="197" cy="234" rx="7" ry="5" fill={SKIN_SHADE} opacity="0.38"/>
          <ellipse cx="190" cy="225" rx="5" ry="3" fill="#D8AA78" opacity="0.22"/>

          {/* ── BEARD ──────────────────────────────────────────────── */}
          {/* Main beard mass — thick, full, dark */}
          <path
            d="M 108,206 Q 104,240 110,272 Q 130,308 164,319 Q 178,324 190,324 Q 202,324 216,319 Q 250,308 270,272 Q 276,240 272,206 Q 260,224 244,232 Q 224,241 204,244 Q 197,245 190,245 Q 183,245 176,244 Q 156,241 136,232 Q 120,224 108,206 Z"
            fill={HAIR}
          />
          {/* Beard texture lines */}
          {[
            "M 136,230 Q 138,256 143,282",
            "M 154,240 Q 156,265 158,290",
            "M 172,244 Q 173,270 174,293",
            "M 190,245 Q 190,272 190,296",
            "M 208,244 Q 207,270 206,293",
            "M 226,240 Q 224,265 222,290",
            "M 244,230 Q 242,256 237,282",
          ].map((d, i) => (
            <path key={i} d={d} stroke="#0A0806" strokeWidth="1" fill="none" opacity="0.35"/>
          ))}
          {/* Chin highlight */}
          <path d="M 172,317 Q 181,323 190,324 Q 199,323 208,317 Q 199,321 190,322 Q 181,321 172,317 Z"
            fill={HAIR_MED} opacity="0.45"/>
          {/* Cheek beard left */}
          <path d="M 108,188 Q 105,220 108,244 Q 117,231 128,225 Q 113,218 108,188 Z"
            fill={HAIR} opacity="0.85"/>
          {/* Cheek beard right */}
          <path d="M 272,188 Q 275,220 272,244 Q 263,231 252,225 Q 267,218 272,188 Z"
            fill={HAIR} opacity="0.85"/>

          {/* ── MUSTACHE ───────────────────────────────────────────── */}
          <path d="M 172,239 Q 181,229 190,231 Q 199,229 208,239 Q 200,244 190,244 Q 180,244 172,239 Z"
            fill={HAIR}/>
          {/* Cupid's bow detail */}
          <path d="M 175,237 Q 183,228 190,230 Q 184,232 175,237 Z" fill="#0A0806" opacity="0.45"/>
          <path d="M 205,237 Q 197,228 190,230 Q 196,232 205,237 Z" fill="#0A0806" opacity="0.45"/>

          {/* ── HOODIE COLLAR ──────────────────────────────────────── */}
          <path d="M 158,297 Q 170,312 190,316 Q 210,312 222,297"
            fill="none" stroke={HOODIE_LT} strokeWidth="3" strokeLinecap="round"/>

        </g>
      </svg>
    </motion.div>
  );
}
