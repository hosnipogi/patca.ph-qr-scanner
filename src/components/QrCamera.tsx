import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Box } from "@mui/material";

type ListCameraType = QrScanner.Camera[];

interface IQrScanner {
  onScan: (data: any) => void;
  isUnmounting: boolean;
}

const useQrScanner = ({ onScan, isUnmounting }: IQrScanner) => {
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
  const [listCameras, setListCameras] = useState<ListCameraType | null>(null);
  const [initialized, setInitialized] = useState(false);
  const videoElement = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timer: any;

    const init = () => {
      if (videoElement.current) {
        timer = setTimeout(async () => {
          const hasCameras = await QrScanner.hasCamera();
          setInitialized(hasCameras);
          const cameras = await QrScanner.listCameras();
          setListCameras(cameras);
          await initializeCamera();
        }, 100);
      }
    };
    if (!initialized) {
      init();
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isUnmounting) {
      destroyScanner(true);
    }
  }, [isUnmounting]);

  const initializeCamera = async () => {
    try {
      if (videoElement.current) {
        const qr = new QrScanner(videoElement.current!, handleScan, {
          highlightScanRegion: true,
          maxScansPerSecond: 1,
          returnDetailedScanResult: true,
          onDecodeError: (e) => {
            console.log({ e });
          },
        });

        await qr.start();
        setQrScanner(qr);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const handleChangeCamera = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (qrScanner) {
      await qrScanner.setCamera(e.currentTarget.value);
    }
  };

  const destroyScanner = (destroy = false) => {
    if (qrScanner) {
      qrScanner.stop();
      if (destroy) {
        qrScanner.destroy();
        setQrScanner(null);
        setInitialized(false);
        setListCameras(null);
      }
    }
  };

  const handleScan = (e: QrScanner.ScanResult) => {
    onScan(e.data);
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#ccc",
          width: 600,
          height: 400,
          mx: "auto",
        }}
      >
        <video
          style={{
            width: "100%",
            height: "100%",
          }}
          ref={videoElement}
        />
      </Box>
      {initialized ? (
        <>
          {listCameras!?.length > 1 && (
            <select onChange={handleChangeCamera}>
              {listCameras?.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          )}
        </>
      ) : (
        <h4>err</h4>
      )}
    </Box>
  );
};

export default React.memo(useQrScanner);
