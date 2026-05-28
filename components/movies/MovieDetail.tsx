"use client";
import { CDN_IMAGE_URL, LIMIT_PER_PAGE } from "@/constants";
import { AppContext, StoreAction } from "@/context/app.context";
import { ModalContext } from "@/context/modal.context";
import { Episode, Episodes, Movie, MovieDetail } from "@/types";
import { Icon } from "@iconify/react";
import { default as Link, default as NextLink } from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Image } from "../Image";

type ServerType = "art-player" | "anym" | "hlsplayer";
type MovieDetailProps = { movie: MovieDetail };

const LIMIT_EPISODE_PER_GROUP = 50;

export const MovieDetails = ({ movie }: MovieDetailProps) => {
  const [src, setSrc] = useState<string>("");
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>();
  const [streamingServer, setStreamingServer] =
    useState<ServerType>("art-player");
  const [server, setServer] = useState<Episodes>();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const searchParams = useSearchParams();
  const episode = searchParams.get("episode");
  const serverName = searchParams.get("serverName");

  const { dispatch, state } = useContext(ModalContext);
  const appContext = useContext(AppContext);
  const isFavourite = appContext.state.favMovies.some(
    (m) => m.slug === movie?.slug,
  );

  useEffect(() => {
    setSrc(movie.thumb_url);
    if (!state.hasShown && movie.category.some((c) => c.slug === "phim-18")) {
      dispatch({
        type: StoreAction.WARNING,
        payload: {
          modalType: "warning",
        },
      });
    }
    if (
      !["Tập 0", "Trailer"].includes(movie.episode_current) &&
      movie.episodes[0].server_data[0]
    ) {
      setServer(movie.episodes[0]);
      setSelectedEpisode(movie.episodes[0].server_data[0]);
    }
  }, []);

  useEffect(() => {
    const handleBlur = () => {
      const iframe = iframeRef.current;

      if (document.activeElement === iframe) {
        const savedMovies = JSON.parse(
          localStorage.getItem("histories") || "[]",
        );
        const uniqueMovies = [
          {
            origin_name: movie.origin_name,
            poster_url: movie.poster_url,
            thumb_url: movie.thumb_url,
            year: movie.year,
            episode_current: movie.episode_current,
            slug: movie.slug,
            name: movie.name,
            quality: movie.quality,
            lang: movie.lang,
            time: movie.time,
            history_url: location.pathname + location.search,
          },
          ...savedMovies.filter((m: Movie) => m.slug !== movie.slug),
        ].slice(0, LIMIT_PER_PAGE);
        localStorage.setItem("histories", JSON.stringify(uniqueMovies));
      }
    };

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!server) return;

    const foundEpisode = server.server_data.find((ep) => ep.slug === episode);
    if (foundEpisode) {
      setSelectedEpisode(foundEpisode);
    }
  }, [episode, server]);

  useEffect(() => {
    const foundServerName = movie.episodes.find(
      (server) => server.server_name === serverName,
    );
    if (foundServerName) {
      setServer(foundServerName);
    }
  }, [serverName]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${
            CDN_IMAGE_URL + movie.poster_url
          }&output=webp)`,
        }}
        className="bg-cover w-full aspect-video relative bg-center lg:max-h-[800px]"
      >
        <div className="inset-0 px-4 pb-10 pt-24 flex items-center lg:absolute z-10 bg-secondary/60">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 md:flex-row">
            <Image
              src={src}
              alt={movie.name}
              className="aspect-[2/3] rounded-xl w-full max-w-[300px]"
              width={300}
            />
            <div className="w-full">
              <h2 className="text-4xl font-extrabold lg:text-5xl">
                {movie.name}
              </h2>
              <span className="text-primary font-bold">
                {movie.origin_name}
              </span>
              <div className="font-medium flex flex-col gap-5 my-4 lg:flex-row lg:items-center">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="bg-white px-2.5 py-1 text-black">
                    {movie.episode_current}
                  </span>
                  <span className="border-2 border-white px-2.5 py-0.5">
                    {movie.quality}
                  </span>
                </div>
                <ul className="flex items-center flex-wrap gap-x-2">
                  {movie.category.map((g, idx) => (
                    <NextLink
                      href={`/the-loai/${g.slug}`}
                      key={g.id}
                      className="hover:text-primary"
                    >
                      {g.name}
                      {idx + 1 !== movie.category.length ? "," : ""}
                    </NextLink>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2">
                  <Icon
                    icon="bx:calendar"
                    className="text-primary"
                    height={16}
                  />
                  {movie.year}
                </span>
                <span className="flex items-center gap-2">
                  <Icon
                    icon="akar-icons:clock"
                    className="text-primary"
                    height={16}
                  />
                  {movie.time.replace("undefined", "???") || "Đang cập nhật"}
                </span>
                <span className="flex items-center gap-2">
                  <Icon
                    icon="tdesign:subtitle"
                    className="text-primary"
                    height={16}
                  />
                  {movie.lang}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2">
                  <Icon icon="jam:movie" className="text-primary" height={16} />
                  {movie.episode_current === "Full"
                    ? "1"
                    : (movie.episode_current.match(/\d+/) ?? 0)}{" "}
                  / {movie.episode_total === "Full" ? "1" : movie.episode_total}
                </span>
                <div className="flex items-center gap-2 my-2">
                  <Icon
                    icon="grommet-icons:language"
                    className="text-primary"
                    height={16}
                  />
                  <ul className="flex items-center gap-2">
                    {movie.country.map((c, idx) => (
                      <NextLink
                        href={`/quoc-gia/${c.slug}`}
                        key={c.id}
                        className="hover:text-primary"
                      >
                        {c.name}
                        {idx + 1 !== movie.country.length ? "," : ""}
                      </NextLink>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: movie.content }}
                className="text-sm max-h-80 overflow-auto movie-content"
              />
              <div className="border border-white/5 bg-white/5 backdrop-blur px-4 py-4 flex items-center w-max rounded-lg mt-8 gap-1.5 md:gap-5 md:px-7">
                <button
                  className="flex-col justify-center items-center gap-1 text-sm flex hover:text-primary"
                  onClick={() =>
                    dispatch({
                      type: StoreAction.SHARE,
                      payload: {
                        modalType: "share",
                      },
                    })
                  }
                >
                  <Icon icon="solar:share-bold" height={18} />
                  Chia sẻ
                </button>
                <span className="h-12 w-0.5 bg-white/10 md:block" />
                <div className="flex items-center gap-3 text-sm font-bold">
                  <button
                    className="rounded-full bg-primary text-black px-8 py-3 disabled:bg-zinc-600 disabled:hover:bg-zinc-600 disabled:text-white"
                    disabled={!movie.trailer_url}
                    onClick={() => {
                      dispatch({
                        type: StoreAction.TRAILER,
                        payload: {
                          videoTrailerId: movie.trailer_url.split("v=")[1],
                          modalType: "trailer",
                        },
                      });
                    }}
                  >
                    Trailer
                  </button>
                  <button
                    className={`${
                      isFavourite
                        ? "bg-[#f00] border-[#f00]"
                        : "bg-black/70 border-primary hover:bg-primary hover:text-black"
                    } flex items-center gap-2 rounded-full border-2 px-5 py-2.5 duration-300`}
                    onClick={() => {
                      appContext.dispatch({
                        type: isFavourite
                          ? StoreAction.REMOVE
                          : StoreAction.ADD,
                        payload: {
                          slug: movie.slug,
                          thumb_url: src,
                          name: movie.name,
                        },
                      });
                    }}
                  >
                    <Icon
                      icon={
                        isFavourite
                          ? "ph:heart-break-fill"
                          : "solar:heart-linear"
                      }
                      height={20}
                    />
                    {isFavourite ? "Bỏ thích" : "Yêu thích"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-secondary" />
      </div>
      {selectedEpisode && (
        <div className="mx-auto max-w-7xl">
          <div className="text-sm px-5">
            {movie.episodes.map((server) => (
              <ul key={server.server_name}>
                <p className="text-base font-bold mb-4 mt-8">
                  {server.server_name}
                </p>
                <EpisodeGroup server={server} />
              </ul>
            ))}
          </div>
          {selectedEpisode && (
            <div className="max-w-5xl mx-auto mt-16">
              <div className="flex items-center justify-center gap-2">
                <button
                  className={`rounded px-4 py-0.5 ${
                    streamingServer === "art-player"
                      ? "bg-blue-500"
                      : "bg-white/5"
                  }`}
                  onClick={() => setStreamingServer("art-player")}
                >
                  Server 1
                </button>
                <button
                  className={`rounded px-4 py-0.5 ${
                    streamingServer === "anym" ? "bg-blue-500" : "bg-white/5"
                  }`}
                  onClick={() => setStreamingServer("anym")}
                >
                  Server 2
                </button>
                <button
                  className={`rounded px-4 py-0.5 ${
                    streamingServer === "hlsplayer"
                      ? "bg-blue-500"
                      : "bg-white/5"
                  }`}
                  onClick={() => setStreamingServer("hlsplayer")}
                >
                  Server 3
                </button>
              </div>
              <p className="text-red-500 text-center text-sm mt-2 mb-5">
                Vui lòng đổi server nếu không xem được
              </p>
              <iframe
                key={streamingServer}
                ref={iframeRef}
                src={
                  streamingServer === "art-player"
                    ? selectedEpisode.link_embed
                    : streamingServer === "anym"
                      ? `https://anym3u8player.com/tv/p.php?url=${selectedEpisode.link_m3u8}`
                      : `https://www.hlsplayer.org/play?url=${encodeURIComponent(
                          selectedEpisode.link_m3u8,
                        )}`
                }
                className="w-full aspect-video overflow-hidden bg-stone-900 rounded-md"
                scrolling="no"
                sandbox={
                  streamingServer === "art-player" ? undefined : "allow-scripts"
                }
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const EpisodeGroup = ({ server }: { server: Episodes }) => {
  const searchParams = useSearchParams();
  const episode = searchParams.get("episode");
  const serverName = searchParams.get("serverName");

  const [groupIndex, setGroupIndex] = useState<number>(0);

  useEffect(() => {
    if (!episode) return;
    const currentEp = Number(episode.split("-")[0]) || 1;

    const idx = Math.floor((currentEp - 1) / LIMIT_EPISODE_PER_GROUP);
    setGroupIndex(idx);
  }, [episode]);

  const currentEpisode = useMemo(() => {
    const lastName = server.server_data.at(-1)?.name;
    if (!lastName) return 1;

    const lastPart = lastName.split("-").at(-1);
    return Number(lastPart) || 1;
  }, [server.server_data]);

  const totalGroup = useMemo(
    () => Math.ceil(currentEpisode / LIMIT_EPISODE_PER_GROUP),
    [currentEpisode],
  );

  const extractEpisodeGroup = (idx: number) => {
    const start = idx * LIMIT_EPISODE_PER_GROUP + 1;
    let end = (idx + 1) * LIMIT_EPISODE_PER_GROUP;
    if (end > currentEpisode) end = currentEpisode;
    return { start, end };
  };

  const groupEpisodes = useMemo(() => {
    return server.server_data.filter((ep) => {
      let firstEp = ep.name.split("-")[0];
      if (firstEp.toLowerCase() === "full") firstEp = "1";

      const { start, end } = extractEpisodeGroup(groupIndex);
      if (+firstEp >= start && +firstEp <= end) return ep;
    });
  }, [groupIndex]);

  return (
    <div>
      <div className="flex items-center flex-wrap gap-2">
        {Array.from({ length: totalGroup }, (_, idx) => {
          const { start, end } = extractEpisodeGroup(idx);
          return (
            <div
              className={`px-3 py-1.5 font-medium rounded min-w-max text-xs cursor-pointer ${groupIndex === idx ? "bg-white text-black" : "bg-white/10"}`}
              onClick={() => setGroupIndex(idx)}
            >
              Tập {start}
              {end === start ? "" : ` - ${end}`}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-10">
        {groupEpisodes.map((ep) => (
          <Link
            href={{
              query: {
                serverName: server.server_name,
                episode: ep.name,
              },
            }}
            key={ep.slug}
            className={`rounded-md flex items-center justify-center gap-2 p-3 hover:bg-primary duration-200 hover:text-black ${
              ep?.name === episode && server.server_name === serverName
                ? "bg-primary text-black"
                : "bg-white/5"
            }`}
          >
            <Icon icon="boxicons:play-filled" />
            Tập {ep.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
