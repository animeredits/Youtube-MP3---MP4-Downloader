import React from "react";
import styles from "../Styles/Content.module.css";
import DashboardInputbox from "./InputBox/DashboardInputbox";
function Content() {
  return (
    <>
      <DashboardInputbox />
      <div className={styles.container}>
        <div className={styles.ftcoSection}>
          <h2 className={styles.title}>
            Download YouTube videos in 1080p and MP3 online {new Date().getFullYear()}
          </h2>
          <p>
            <b>Brand</b> is a Youtube downloader, allowing you to download high
            quality Youtube videos: 1080p, 2k, 4k. Save and download any Youtube
            video in .mp3, .mp4 format quickly with the highest quality.
          </p>
          <p>
            Support downloading any Youtube video on any device: PC, tablet,
            phone (iPhone, Android). Download Youtube videos online on a web
            browser, no need to install software.
          </p>
          <h3 className={styles.title}>Key features</h3>
          <ul className={styles.listFeature}>
            <li>
              <strong style={{ fontWeight: 500 }}>Easy and Fast</strong>: using
              our Youtube downloader is the best way to download any Youtube
              video in highest quality in few easy steps.
            </li>
            <li>
              <strong style={{ fontWeight: 500 }}>
                Download high quality Youtube videos
              </strong>
              : supports downloading videos from Youtube to your device with the
              highest quality: full HD, 1080p, 2k, 4k.
            </li>
            <li>
              <strong style={{ fontWeight: 500 }}>Supports all devices</strong>:
              Brand supports all platforms and devices, easily download Youtube
              videos on PC, tablet, iPhone or Android.
            </li>
            <li>
              <strong style={{ fontWeight: 500 }}>All Formats Support</strong>:
              we support all video and audio formats. You can convert Youtube
              videos to MP3, 3GP, MP4, WMA, M4A, FLV, WEBM and MO formats, etc.
            </li>
            <li>
              <strong style={{ fontWeight: 500 }}>Unlimited Downloads</strong>:
              Brand is a free Youtube downloader, you can download and convert
              videos from Youtube without limit.
            </li>
          </ul>
        </div>
        <div className={styles.ftcoSection}>
          <h2 className={styles.title}>
            How to download Youtube videos in {new Date().getFullYear()}
          </h2>
          <p>
            <b>Step 1</b>: Open the Youtube app on your phone or visit the
            Youtube.com website.
          </p>
          <p>
            <b>Step 2</b>: Find and open the video you want to download and
            click the <b>Share</b> button then continue pressing the{" "}
            <b>Copy link</b> button.
          </p>
          <p>
            <b>Step 3</b>: Go to <a href="/">Brand</a> website, paste the copied
            Youtube link in the search box and press the <b>Download</b> button.
          </p>
          <p>
            <b>Step 4</b>: Select the <b>MP4</b> or <b>MP3</b> format you want
            and then click the <b>Download</b> button.
          </p>
        </div>
        <div className={styles.ftcoSection}>
          <h2 className={styles.title}>
            How to Download YouTube Videos on Desktop or Mobile (
            {new Date().getFullYear()})
          </h2>
          <p>
            Brand Youtube Downloader is developed with the purpose of allowing
            users to download videos from Youtube for free. Although born later
            compared to other Youtube downloaders, Brand has outstanding
            features to help download Youtube videos quickly with the best
            quality.
          </p>
          <p>
            Brand supports downloading Youtube videos on web browsers, supports
            all devices: Desktop, Tablet, iPhone, Android. That's why Brand
            downloader is always the most used YouTube video downloader today.
          </p>
          <p>
            <i>
              With Brand, you can easily download and convert videos from
              Youtube with the highest quality. We will continuously upgrade to
              bring you the best experience. Please share this tool with friends
              and family!
            </i>
          </p>
        </div>
        <div className={`${styles.ftcoSection} ${styles.sectionLeft}`}>
          <section itemScope itemType="https://schema.org/FAQPage">
            <div className={styles.sfContainer}>
              <div className={styles.wrapper}>
                <div className={styles.sfFaq}>
                  <h3 className={`${styles.title} ${styles.center}`}>FAQ</h3>
                  <div
                    className={styles.faqItem}
                    itemProp="mainEntity"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className={styles.faqItemTitle}>
                      <h4 itemProp="name">What is Brand Downloader?</h4>
                    </div>
                    <div
                      className={styles.faqItemContent}
                      id={styles.divId}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">
                        <p>
                          Brand is a Youtube downloader, allowing to download
                          high quality Youtube videos: 1080p, 2k, 4k for free.
                          Support PC, tablet, phone (iPhone, Android) without
                          software installation.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.faqItem}
                    itemProp="mainEntity"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className={styles.faqItemTitle}>
                      <h4 itemProp="name">
                        How to download Youtube videos fastest?
                      </h4>
                    </div>
                    <div
                      className={styles.faqItemContent}
                      id={styles.divId2}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">
                        <ul className={styles.faqUl}>
                          <li>
                            <strong style={{ fontWeight: 500 }}>Step 1</strong>:
                            Open the Youtube app on your phone or visit the
                            Youtube.com website.
                          </li>
                          <li>
                            <strong style={{ fontWeight: 500 }}>Step 2</strong>:
                            Find and open the video you want to download and
                            click the <b>Share</b> button then continue pressing
                            the <b>Copy link</b> button.
                          </li>
                          <li>
                            <strong style={{ fontWeight: 500 }}>Step 3</strong>:
                            Go to <a href="/">Brand</a> website, paste the
                            copied Youtube link in the search box and press the{" "}
                            <b>Download</b> button.
                          </li>
                          <li>
                            (
                            <i>
                              Brand works well on Chrome, Safari, Firefox or any
                              other browser.
                            </i>
                            )
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.faqItem}
                    itemProp="mainEntity"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className={styles.faqItemTitle}>
                      <h4 itemProp="name">
                        How to download Youtube videos on Android for free?
                      </h4>
                    </div>
                    <div
                      className={styles.faqItemContent}
                      id={styles.divId3}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">
                        <p>Copy the link to the Youtube video → Go to</p>
                        <a href="/">
                          <strong style={{ fontWeight: 500 }}> Brand</strong>
                        </a>{" "}
                        <p>
                          → Paste the copied Youtube link in the search box →
                          Download.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.faqItem}
                    itemProp="mainEntity"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className={styles.faqItemTitle}>
                      <h4 itemProp="name">
                        How to download Youtube videos on iPhone quickly?
                      </h4>
                    </div>
                    <div
                      className={styles.faqItemContent}
                      id={styles.divId4}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">
                        <p>
                          For iPhone, you need to use <b>Safari</b> browser on
                          iOS 13 or get <b>Documents by Readdle</b> app and go
                          to Brand → Paste Youtube video link → Download (
                          <a href="/">see instructions here</a>
                          ).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.faqItem}
                    itemProp="mainEntity"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className={styles.faqItemTitle}>
                      <h4 itemProp="name">
                        How to download highest quality Youtube videos?
                      </h4>
                    </div>
                    <div
                      className={styles.faqItemContent}
                      id={styles.divId5}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">
                        <p>
                          Brand is a Youtube downloader, which allows you to
                          convert and download videos from Youtube in best
                          quality: 1080p, 2k, 4k in few easy steps.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.faqItem}
                    itemProp="mainEntity"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className={styles.faqItemTitle}>
                      <h4 itemProp="name">
                        Do I have to pay to download Youtube videos?
                      </h4>
                    </div>
                    <div
                      className={styles.faqItemContent}
                      id={styles.divId6}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">
                        <p>
                          Absolutely not, our Youtube downloader allows to
                          download Youtube videos for free. You can download any
                          Youtube video without limitation.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Content;
