import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  TrainFront,
} from "lucide-react";

const YOKOSUKA_BLUE = "rgb(38, 52, 163)";
const WALKING_MINUTES_TO_PLATFORM = 10;

const yokosukaTrains = [
  { time: "05:13", type: "普通", destination: "東京" },
  { time: "05:31", type: "普通", destination: "成田空港" },
  { time: "05:52", type: "普通", destination: "千葉" },
  { time: "06:09", type: "普通", destination: "君津" },
  { time: "06:24", type: "普通", destination: "津田沼" },
  { time: "06:36", type: "普通", destination: "君津" },
  { time: "06:43", type: "普通", destination: "津田沼" },
  { time: "06:51", type: "普通", destination: "千葉" },
  { time: "06:58", type: "普通", destination: "東京" },
  { time: "07:05", type: "普通", destination: "千葉" },
  { time: "07:13", type: "普通", destination: "千葉" },
  { time: "07:21", type: "普通", destination: "君津" },
  { time: "07:28", type: "普通", destination: "成田空港" },
  { time: "07:36", type: "普通", destination: "千葉" },
  { time: "07:39", type: "普通", destination: "津田沼" },
  { time: "07:45", type: "普通", destination: "千葉" },
  { time: "07:49", type: "普通", destination: "千葉" },
  { time: "07:57", type: "普通", destination: "千葉" },
  { time: "08:04", type: "普通", destination: "上総一ノ宮" },
  { time: "08:12", type: "普通", destination: "君津" },
  { time: "08:20", type: "普通", destination: "千葉" },
  { time: "08:29", type: "普通", destination: "津田沼" },
  { time: "08:35", type: "普通", destination: "成田空港" },
  { time: "08:43", type: "普通", destination: "東京" },
  { time: "08:51", type: "普通", destination: "千葉" },
  { time: "09:00", type: "普通", destination: "上総一ノ宮" },
  { time: "09:07", type: "普通", destination: "津田沼" },
  { time: "09:14", type: "普通", destination: "君津" },
  { time: "09:23", type: "普通", destination: "千葉" },
  { time: "09:32", type: "普通", destination: "成田空港" },
  { time: "09:37", type: "普通", destination: "東京" },
  { time: "09:45", type: "普通", destination: "東京" },
  { time: "09:55", type: "普通", destination: "津田沼" },
  { time: "10:07", type: "普通", destination: "千葉" },
  { time: "10:15", type: "普通", destination: "君津" },
  { time: "10:34", type: "普通", destination: "成田空港" },
  { time: "10:45", type: "普通", destination: "千葉" },
  { time: "11:02", type: "普通", destination: "千葉" },
  { time: "11:14", type: "普通", destination: "君津" },
  { time: "11:34", type: "普通", destination: "成田空港" },
  { time: "11:45", type: "普通", destination: "千葉" },
  { time: "12:02", type: "普通", destination: "千葉" },
  { time: "12:15", type: "普通", destination: "君津" },
  { time: "12:34", type: "普通", destination: "成田空港" },
  { time: "12:45", type: "普通", destination: "千葉" },
  { time: "13:02", type: "普通", destination: "千葉" },
  { time: "13:14", type: "普通", destination: "君津" },
  { time: "13:34", type: "普通", destination: "成田空港" },
  { time: "13:45", type: "普通", destination: "千葉" },
  { time: "14:02", type: "普通", destination: "上総一ノ宮" },
  { time: "14:14", type: "普通", destination: "君津" },
  { time: "14:34", type: "普通", destination: "成田空港" },
  { time: "14:46", type: "普通", destination: "千葉" },
  { time: "15:03", type: "普通", destination: "上総一ノ宮" },
  { time: "15:14", type: "普通", destination: "君津" },
  { time: "15:33", type: "普通", destination: "千葉" },
  { time: "15:45", type: "普通", destination: "千葉" },
  { time: "15:58", type: "普通", destination: "成田空港" },
  { time: "16:12", type: "普通", destination: "上総一ノ宮" },
  { time: "16:30", type: "普通", destination: "成田空港" },
  { time: "16:37", type: "普通", destination: "千葉" },
  { time: "16:46", type: "普通", destination: "津田沼" },
  { time: "17:00", type: "普通", destination: "津田沼" },
  { time: "17:07", type: "普通", destination: "成田空港" },
  { time: "17:15", type: "普通", destination: "上総一ノ宮" },
  { time: "17:29", type: "普通", destination: "鹿島神宮" },
  { time: "17:37", type: "普通", destination: "千葉" },
  { time: "17:45", type: "普通", destination: "千葉" },
  { time: "17:58", type: "普通", destination: "津田沼" },
  { time: "18:03", type: "普通", destination: "成東" },
  { time: "18:13", type: "普通", destination: "上総一ノ宮" },
  { time: "18:29", type: "普通", destination: "成田空港" },
  { time: "18:38", type: "普通", destination: "津田沼" },
  { time: "18:47", type: "普通", destination: "成田" },
  { time: "19:01", type: "普通", destination: "千葉" },
  { time: "19:08", type: "普通", destination: "千葉" },
  { time: "19:16", type: "普通", destination: "上総一ノ宮" },
  { time: "19:29", type: "普通", destination: "成田空港" },
  { time: "19:37", type: "普通", destination: "千葉" },
  { time: "19:46", type: "普通", destination: "千葉" },
  { time: "19:58", type: "普通", destination: "東京" },
  { time: "20:11", type: "普通", destination: "千葉" },
  { time: "20:22", type: "普通", destination: "佐倉" },
  { time: "20:32", type: "普通", destination: "千葉" },
  { time: "20:44", type: "普通", destination: "成田空港" },
  { time: "20:51", type: "普通", destination: "君津" },
  { time: "20:58", type: "普通", destination: "成田" },
  { time: "21:06", type: "普通", destination: "千葉" },
  { time: "21:12", type: "普通", destination: "佐倉" },
  { time: "21:23", type: "普通", destination: "成田空港" },
  { time: "21:36", type: "普通", destination: "千葉" },
  { time: "21:46", type: "普通", destination: "津田沼" },
  { time: "21:57", type: "普通", destination: "千葉" },
  { time: "22:10", type: "普通", destination: "千葉" },
  { time: "22:25", type: "普通", destination: "千葉" },
  { time: "22:38", type: "普通", destination: "千葉" },
  { time: "22:59", type: "普通", destination: "千葉" },
  { time: "23:22", type: "普通", destination: "千葉" },
  { time: "23:36", type: "普通", destination: "品川" },
  { time: "23:57", type: "普通", destination: "品川" },
].map((train) => ({ ...train, line: "横須賀線" }));

// 湘南新宿ライン 上り（新宿・大宮・宇都宮方面）平日 ※出典: 駅探
const shonanShinjukuTrains = [
  { time: "06:40", type: "普通", destination: "小金井" },
  { time: "07:16", type: "普通", destination: "小金井" },
  { time: "07:32", type: "普通", destination: "宇都宮" },
  { time: "07:54", type: "普通", destination: "小金井" },
  { time: "08:08", type: "普通", destination: "小金井" },
  { time: "08:25", type: "快速", destination: "宇都宮" },
  { time: "08:55", type: "普通", destination: "宇都宮" },
  { time: "09:11", type: "普通", destination: "古河" },
  { time: "09:49", type: "快速", destination: "宇都宮" },
  { time: "10:00", type: "普通", destination: "小金井" },
  { time: "10:26", type: "快速", destination: "宇都宮" },
  { time: "10:55", type: "普通", destination: "宇都宮" },
  { time: "11:25", type: "快速", destination: "宇都宮" },
  { time: "11:55", type: "普通", destination: "宇都宮" },
  { time: "12:26", type: "快速", destination: "宇都宮" },
  { time: "12:55", type: "普通", destination: "宇都宮" },
  { time: "13:25", type: "快速", destination: "宇都宮" },
  { time: "13:55", type: "普通", destination: "宇都宮" },
  { time: "14:25", type: "快速", destination: "宇都宮" },
  { time: "14:55", type: "普通", destination: "宇都宮" },
  { time: "15:25", type: "快速", destination: "宇都宮" },
  { time: "15:54", type: "普通", destination: "古河" },
  { time: "16:23", type: "快速", destination: "宇都宮" },
  { time: "16:56", type: "普通", destination: "小金井" },
  { time: "17:26", type: "普通", destination: "宇都宮" },
  { time: "17:53", type: "普通", destination: "小金井" },
  { time: "18:25", type: "普通", destination: "古河" },
  { time: "18:54", type: "普通", destination: "宇都宮" },
  { time: "19:24", type: "普通", destination: "古河" },
  { time: "19:54", type: "普通", destination: "古河" },
  { time: "20:40", type: "普通", destination: "宇都宮" },
  { time: "21:32", type: "普通", destination: "小金井" },
  { time: "22:19", type: "普通", destination: "小金井" },
].map((train) => ({ ...train, line: "湘南新宿ライン" }));

const timetable = [...yokosukaTrains, ...shonanShinjukuTrains]
  .map((train) => ({ ...train, minutesFromMidnight: timeToMinutes(train.time) }))
  .sort((a, b) => a.minutesFromMidnight - b.minutesFromMidnight);

function timeToMinutes(t) {
  const parts = t.split(":").map(Number);
  return parts[0] * 60 + parts[1];
}

function minutesToTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function nowMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function formatDate(date) {
  const weekdays = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
}

function formatClock(date) {
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getUpcomingTrains(date) {
  const current = nowMinutes(date);
  const upcoming = timetable
    .map((train) => ({ ...train, minutes: train.minutesFromMidnight - current }))
    .filter((train) => train.minutes >= -1)
    .slice(0, 3);

  if (upcoming.length >= 2) return upcoming;

  const tomorrow = timetable
    .slice(0, 2 - upcoming.length)
    .map((train) => ({ ...train, minutes: train.minutesFromMidnight + 24 * 60 - current }));

  return [...upcoming, ...tomorrow];
}

const defaultOperationLines = [
  { id: "yokosuka", name: "横須賀線", status: "取得中", severity: "normal", detail: "運行情報を取得しています" },
  { id: "shonanShinjuku", name: "湘南新宿ライン", status: "取得中", severity: "normal", detail: "運行情報を取得しています" },
];

const OPERATION_API_URL = "https://yokosuka-status.kanikani-you.workers.dev/";

// detail が「事故・遅延の情報なし／平常」を示す文言
const NO_TROUBLE_PATTERNS = [/情報はありません/, /平常運転/, /平常どおり/, /平常通り/];

// status と detail の両方を見て運行状況を確定する。
// Worker が status="運転見合わせ" なのに detail="情報はありません" のような
// 矛盾した値を返すことがあるため、detail の「平常」表現を最優先する。
function resolveOperation(status, detail) {
  const s = status || "";
  const d = detail || "";

  if (NO_TROUBLE_PATTERNS.some((re) => re.test(d))) {
    return { status: "平常運転", severity: "normal" };
  }

  if (s.includes("運転見合わせ") || d.includes("運転見合わせ")) {
    return { status: s || "運転見合わせ", severity: "suspended" };
  }

  if (s.includes("遅延") || s.includes("列車遅延") || d.includes("遅延")) {
    return { status: s || "遅延", severity: "delay" };
  }

  return { status: s || "平常運転", severity: "normal" };
}

const defaultWeather = {
  area: "東戸塚 / 横浜",
  condition: "取得中",
  currentTemp: 0,
  high: 0,
  low: 0,
  rain: 0,
  uvLevel: "medium",
};

function getWeatherStyle(weather) {
  const text = weather.condition;
  const needsRainUmbrella = weather.rain >= 30 || text.includes("雨") || text.includes("雷") || text.includes("雪");
  const needsSunUmbrella = text.includes("晴") || weather.uvLevel === "high" || weather.uvLevel === "medium";

  if (needsRainUmbrella) {
    return { border: "border-sky-400", bg: "bg-sky-500/10", text: "text-sky-200", recommendation: "雨傘推奨" };
  }

  if (needsSunUmbrella) {
    return { border: "border-orange-400", bg: "bg-orange-500/10", text: "text-orange-200", recommendation: "日傘推奨" };
  }

  return { border: "border-zinc-500", bg: "bg-zinc-500/10", text: "text-zinc-300", recommendation: "傘不要" };
}

function getWeatherIcon(condition) {
  if (condition.includes("雷")) return CloudLightning;
  if (condition.includes("雪")) return CloudSnow;
  if (condition.includes("霧")) return CloudFog;
  if (condition.includes("雨")) return CloudRain;
  if (condition.includes("快晴")) return Sun;
  if (condition.includes("晴") && condition.includes("くもり")) return CloudSun;
  if (condition.includes("晴")) return Sun;
  return Cloud;
}

function StatusBadge({ line }) {
  const isNormal = line.severity === "normal";
  return (
    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${isNormal ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
      {isNormal ? <TrainFront size={13} /> : <AlertTriangle size={13} />}
      <span className="text-white/70">{line.name}</span>
      <span>{line.status}</span>
    </div>
  );
}

const LINE_COLORS = {
  横須賀線: YOKOSUKA_BLUE,
  湘南新宿ライン: "rgb(15, 138, 86)",
};

// GitHub Pages 等でサブパス配信されても解決できるよう base を前置する
const BASE_URL = import.meta.env.BASE_URL;

const LINE_ICONS = {
  横須賀線: `${BASE_URL}yokosuka-line.png`,
  湘南新宿ライン: `${BASE_URL}shonan-shinjuku-line.png`,
};

function TrainRow({ train, delayMinutes, operation }) {
  const isNormalOperation = operation.severity === "normal";
  const urgencyMinutes = train.minutes - WALKING_MINUTES_TO_PLATFORM;

  let urgencyBorder = "border-white/10";
  let urgencyGlow = "shadow-black/40";
  let urgencyText = "text-white/45";
  let urgencyBg = "bg-white/[0.04]";
  let urgencyLabel = `あと${train.minutes}分`;

  if (isNormalOperation && urgencyMinutes <= 0) {
    urgencyBorder = "border-red-500";
    urgencyGlow = "shadow-red-900/40";
    urgencyText = "text-red-300";
    urgencyBg = "bg-red-500/15";
    urgencyLabel = `あと${train.minutes}分　かなり急ぎ`;
  } else if (isNormalOperation && urgencyMinutes <= 5) {
    urgencyBorder = "border-orange-400";
    urgencyGlow = "shadow-orange-900/30";
    urgencyText = "text-orange-300";
    urgencyBg = "bg-orange-400/15";
    urgencyLabel = `あと${train.minutes}分　急ぎ`;
  }

  const adjustedTime = minutesToTime(timeToMinutes(train.time) + delayMinutes);
  const lineColor = LINE_COLORS[train.line] || YOKOSUKA_BLUE;
  const iconSrc = LINE_ICONS[train.line] || `${BASE_URL}yokosuka-line.png`;

  return (
    <div className={`rounded-2xl border bg-white/[0.035] p-3 shadow-2xl ${urgencyBorder} ${urgencyGlow}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden">
          <img src={iconSrc} alt="train" className="h-full w-full scale-125 object-contain" />
        </div>

        <div className="shrink-0 text-4xl font-black tracking-tight tabular-nums text-white">{adjustedTime}</div>

        <div className="ml-auto flex shrink-0 items-center gap-2 text-right">
          <div className="rounded-md px-2 py-1 text-xs font-black text-white" style={{ backgroundColor: lineColor }}>
            {train.line}
          </div>
          <div className="rounded-md border border-white/15 px-3 py-1 text-base font-bold text-white/80">{train.type}</div>
          <div className="flex items-end gap-1">
            <div className="text-2xl font-black text-white">{train.destination}</div>
            <div className="mb-1 text-xs font-bold tracking-widest text-white/50">行</div>
          </div>
        </div>
      </div>

      {isNormalOperation && (
        <div className="mt-2 pl-14">
          <span className={`inline-flex rounded-full border border-white/10 px-3 py-1 text-sm font-black ${urgencyBg} ${urgencyText}`}>
            {urgencyLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default function YokosukaLineHomeDisplay() {
  const [now, setNow] = useState(new Date());
  const [operationLines, setOperationLines] = useState(defaultOperationLines);
  const [weather, setWeather] = useState(defaultWeather);
  const [showOperationMap, setShowOperationMap] = useState(false);

  const operationByLine = useMemo(
    () => Object.fromEntries(operationLines.map((line) => [line.name, line])),
    [operationLines]
  );
  const hasOperationTrouble = operationLines.some((line) => line.severity !== "normal");
  const operationFor = (train) => operationByLine[train?.line] || { severity: "normal" };

  useEffect(() => {
    if (!hasOperationTrouble) {
      setShowOperationMap(false);
      return;
    }

    const timer = setInterval(() => {
      setShowOperationMap((prev) => !prev);
    }, 6000);

    return () => clearInterval(timer);
  }, [hasOperationTrouble]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchOperation() {
      try {
        const res = await fetch(OPERATION_API_URL);
        const data = await res.json();

        const lines = (data.lines || []).map((line) => {
          const detail = line.detail || "運行情報の詳細は取得できませんでした";
          const resolved = resolveOperation(line.status || "", detail);
          return {
            id: line.id,
            name: line.name,
            status: resolved.status,
            severity: resolved.severity,
            detail,
          };
        });

        if (lines.length) {
          setOperationLines(lines);
        }
      } catch (error) {
        console.error("operation fetch failed", error);
        setOperationLines(
          defaultOperationLines.map((line) => ({
            ...line,
            status: "取得失敗",
            severity: "delay",
            detail: "運行情報を取得できませんでした",
          }))
        );
      }
    }

    fetchOperation();
    const operationTimer = setInterval(fetchOperation, 1000 * 60);
    return () => clearInterval(operationTimer);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=35.4764&longitude=139.5563&current=temperature_2m,weather_code&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=Asia%2FTokyo&forecast_days=1"
        );
        const data = await res.json();

        const weatherCodeMap = {
          0: "快晴",
          1: "晴れ",
          2: "晴れ時々くもり",
          3: "くもり",
          45: "霧",
          48: "霧",
          51: "小雨",
          53: "雨",
          55: "強い雨",
          61: "雨",
          63: "雨",
          65: "大雨",
          71: "雪",
          80: "にわか雨",
          95: "雷雨",
        };

        const uv = data.daily.uv_index_max?.[0] ?? 0;

        // 日次の最大値（深夜時間帯を含む）ではなく、現在時刻以降の降水確率の最大値を採用する
        const hourlyTimes = data.hourly?.time ?? [];
        const hourlyRain = data.hourly?.precipitation_probability ?? [];
        const currentHour = (data.current.time || "").slice(0, 13);
        let startIndex = hourlyTimes.findIndex((t) => t.slice(0, 13) === currentHour);
        if (startIndex < 0) startIndex = 0;
        const remainingRain = hourlyRain.slice(startIndex).filter((v) => v != null);
        const rain = remainingRain.length ? Math.max(...remainingRain) : 0;

        setWeather({
          area: "東戸塚 / 横浜",
          condition: weatherCodeMap[data.current.weather_code] || "不明",
          currentTemp: data.current.temperature_2m,
          high: data.daily.temperature_2m_max[0],
          low: data.daily.temperature_2m_min[0],
          rain,
          uvLevel: uv >= 6 ? "high" : uv >= 3 ? "medium" : "low",
        });
      } catch (error) {
        console.error("weather fetch failed", error);
      }
    }

    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 1000 * 60 * 10);
    return () => clearInterval(weatherTimer);
  }, []);

  const trains = useMemo(() => getUpcomingTrains(now), [now]);
  const weatherStyle = getWeatherStyle(weather);
  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <div className="h-screen w-full overflow-hidden bg-[#050607] p-4 text-white">
      <div className="mx-auto flex h-full max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 p-5 shadow-2xl shadow-black lg:aspect-[16/10] lg:h-auto">
        <header className="relative mb-4 flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">東戸塚駅</h1>
            <p className="mt-1 text-sm font-bold text-white/50">横須賀線・湘南新宿ライン 上り / 東京・新宿方面</p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
            <div className="text-4xl font-black leading-none tabular-nums">{formatClock(now)}</div>
          </div>

          <div className="text-right text-2xl font-black leading-none tabular-nums text-white/80">
            {formatDate(now)}
          </div>
        </header>

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-[1.35fr_1.05fr]">
          <section className="flex min-h-0 flex-col gap-3 overflow-hidden pr-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {operationLines.map((line) => (
                  <StatusBadge key={line.id} line={line} />
                ))}
              </div>
              <div className="shrink-0 text-xs font-bold text-white/40">ホームまで徒歩10分</div>
            </div>

            <TrainRow train={trains[0]} delayMinutes={0} operation={operationFor(trains[0])} />
            <TrainRow train={trains[1]} delayMinutes={0} operation={operationFor(trains[1])} />
            <TrainRow train={trains[2]} delayMinutes={0} operation={operationFor(trains[2])} />
          </section>

          <aside className="flex min-h-0 flex-col gap-3 overflow-hidden pr-1">
            <div className={`rounded-2xl border p-4 ${weatherStyle.border} ${weatherStyle.bg}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black tracking-[0.2em] text-white">
                  <WeatherIcon size={17} /> WEATHER
                </div>
                <div className={`text-sm font-bold ${weatherStyle.text}`}>{weather.area}</div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-3xl font-black">{weather.condition}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-black tracking-wider ${weatherStyle.border} ${weatherStyle.bg} ${weatherStyle.text}`}>
                      {weatherStyle.recommendation}
                    </div>
                    <div className="text-sm font-bold text-white/45">降水確率 {weather.rain}%</div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-4xl font-black tabular-nums">{weather.currentTemp.toFixed(1)}℃</div>
                  <div className="mt-1 text-sm font-bold text-white/50">最高 {weather.high}℃ / 最低 {weather.low}℃</div>
                </div>
              </div>
            </div>

<div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-4">
  {!showOperationMap ? (
    <>
      <div className="mb-2 text-sm font-bold text-white/70">運行メモ</div>

      <div className="flex flex-1 flex-col gap-2">
        {operationLines.map((line) => {
          const isNormal = line.severity === "normal";
          return (
            <div key={line.id} className="flex flex-1 flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="rounded px-2 py-0.5 text-[11px] font-black text-white"
                  style={{ backgroundColor: LINE_COLORS[line.name] || YOKOSUKA_BLUE }}
                >
                  {line.name}
                </span>
                <span className={`text-xs font-black ${isNormal ? "text-emerald-300" : "text-amber-300"}`}>
                  {line.status}
                </span>
              </div>
              <div className="text-sm font-bold leading-relaxed text-white/55">{line.detail}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-white/30">
        <span>平日ダイヤ固定 / 運行情報はYahoo経由</span>
      </div>
    </>
  ) : (
    <>
      <div className="mb-2 text-sm font-bold text-white/70">
        <span>JR東日本 関東エリア運行マップ</span>
      </div>

      <a
        href="https://traininfo.jreast.co.jp/train_info/kanto.aspx"
        target="_blank"
        rel="noreferrer"
        className="block flex-1 overflow-hidden rounded-xl border border-white/10 bg-white"
      >
        <img
          src="https://traininfo.jreast.co.jp/train_info/img/display/idsImage.gif"
          alt="JR東日本 関東エリア運行マップ"
          className="h-full w-full object-contain"
        />
      </a>

      <div className="mt-2 text-[11px] text-white/30">
        クリックでJR東日本公式ページを開く
      </div>
    </>
  )}
</div>

          </aside>
        </main>
      </div>
    </div>
  );
}
