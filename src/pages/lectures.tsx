import type { HeadFC, PageProps } from "gatsby"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { CommonHead } from "../components/Head/CommonHead"
import { Layout } from "../components/Layout"
import { Button } from "../components/Button"

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

import { lectures } from "../data/lectures"
import { LectureSelect } from "../components/LectureSelect"

const ClientSidePdfDoc = React.lazy(() => import("../components/PdfDoc"))

const Page: React.FC<PageProps> = (props) => {
  const { t } = useTranslation()

  const [activeLectureIndex, setActiveLectureIndex] = React.useState(0)
  const [graypaperVisible, setGraypaperVisible] = React.useState(false)
  const activeLecture = lectures[activeLectureIndex]
  const activePage = activeLecture.pages[0]

  const isSSR = typeof window === "undefined"

  return (
    <Layout wide>
      <div className="mx-auto md:w-3/4">
        <h2 id="lectures" className="text-center">
          {t("Lectures")}
        </h2>
        <LectureSelect />
        <label htmlFor="select-lecture">{t("Select Lecture")}</label>
        <select
          id="select-lecture"
          className="mt-1 block rounded-sm p-2 text-xs text-black md:text-sm"
          onChange={(e) => setActiveLectureIndex(parseInt(e.target.value))}
          value={activeLectureIndex}
        >
          {lectures.map((lecture, index) => (
            <option key={index} value={index}>
              {lecture.section}
            </option>
          ))}
        </select>
      </div>

      {activeLecture && (
        <>
          <div className="mx-auto md:w-3/4">
            <h3 className="mb-0">{activeLecture.section}</h3>
            <p className="mb-4 mt-0 w-full text-sm font-normal text-gray-400">
              {t(activeLecture.i18nSubtitle)}
            </p>
          </div>
          <LiteYouTubeEmbed
            iframeClass="mt-0 pt-0"
            id={activeLecture.videoId}
            title={activeLecture.section}
            poster="maxresdefault"
          />
        </>
      )}
      <div className="mx-auto mt-4 md:w-3/4">
        <Button
          className="w-full"
          onClick={() => setGraypaperVisible(!graypaperVisible)}
        >
          {graypaperVisible
            ? t("Hide Gray Paper")
            : t("Show Section in Gray Paper")}{" "}
          {graypaperVisible ? "↑" : "↓"}
        </Button>
      </div>
      {graypaperVisible && (
        <>
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <ClientSidePdfDoc
                pdfUrl="/graypaper_no_background.pdf"
                initialPageNumber={activePage}
              />
            </React.Suspense>
          )}
        </>
      )}
      <div className="mx-auto mt-4 flex justify-between gap-4 md:w-3/4">
        <Button
          onClick={() =>
            setActiveLectureIndex(Math.max(0, activeLectureIndex - 1))
          }
          disabled={activeLectureIndex === 0}
          className="w-1/2"
        >
          ← {t("Previous Section")}
          <span className="text-muted block text-xs">
            {lectures[activeLectureIndex - 1]?.section}
          </span>
        </Button>
        <Button
          onClick={() =>
            setActiveLectureIndex(
              Math.min(activeLectureIndex + 1, lectures.length - 1),
            )
          }
          disabled={activeLectureIndex === lectures.length - 1}
          className="w-1/2"
        >
          {t("Next Section")} →
          <span className="text-muted block text-xs">
            {lectures[activeLectureIndex + 1]?.section}
          </span>
        </Button>
      </div>
    </Layout>
  )
}

export default Page

export const Head: HeadFC<{}, { langKey?: string }> = (props) => {
  const { t, i18n } = useTranslation(undefined)
  return (
    <>
      <CommonHead />
      <html id="html" lang={i18n.language} />
      <title id="title">{`JAM ${t("Lectures")}`}</title>
      <meta
        id="description"
        name="description"
        content={"Lectures of the JAM Graypaper by Gavin Wood"}
      />
    </>
  )
}
