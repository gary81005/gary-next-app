import { DisplayCard, SimpleDialog } from '@/components';
import { Sectors } from '@/types';
import { drawSector, setBg } from '@/utils';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const riddleArr = process.env.RIDDLE?.split(',') || [];
const candidate = process.env.CANDIDATE?.split(',') || [];
const origin = ['grace', 'will', 'kai', 'ru', 'jj', 'ann', 'joe', 'jordan'];
// const firstStage = {
//   kai: '上班前or下班後-家中-蒸氣加熱',
//   ann: '夜晚-燈光昏暗的場所-一整套，其中有東西要用手指捏住><',
//   ru: '宇宙-未來-砰砰',
//   will: '晚上-浴室-清洗',
//   grace: '上個月-水管-玩',
//   jordan: '隅中日昳-桌案几上-屈指成禮',
//   jj: '白天-辦公室-專注',
//   joe: '搶到場地-室內尤佳-單手揮動',
// };
const RandomPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [title, setTitle] = useState<string>('Start!');
  const [color, setColor] = useState('#8E8E8E');
  const [count, setCount] = useState(0);
  const [angVel, setAngVel] = useState(0);
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedArr, setSelectedArr] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
  // set frame counter
  const [shouldStop, setShouldStop] = useState(true);
  const rand = (m: number, M: number) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const PI = Math.PI;
  const TAU = 2 * PI;
  let ang = 0; // Angle in radians

  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

  function rotate() {
    const sector = sectors[getIndex()];
    if (ctx) {
      ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    }
    setTitle(sector.label);
    setSelected(sector.value);
    setColor(sector.color);
  }

  function frame(value: number) {
    // console.log(ang, angVel);
    if (!angVel) return;
    if (angVel < 0.002) value = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }

  const handleGenerate = () => {
    const oriPos = origin.indexOf(candidate[count].toLowerCase());
    console.log(oriPos);
    const arr = riddleArr.filter((opt, index) => {
      if (index === count || index === oriPos || selectedArr.includes(opt)) {
        return false;
      } else {
        return true;
      }
    });
    const newSectors = arr.map((opt, index) => ({
      color: setBg(sectors),
      label: (index + 1).toString(),
      value: opt,
    }));
    console.log(newSectors);
    setColor('#8E8E8E');
    setTitle('Start!');
    setSectors(newSectors);
  };

  useEffect(() => {
    if (ctx) {
      sectors.forEach((opt, index) => drawSector(ctx, opt, index, sectors.length));
    }
  }, [ctx, sectors]);

  useEffect(() => {
    setCtx(canvasRef.current?.getContext('2d'));
  }, []);

  // update the counter
  useLayoutEffect(() => {
    if (!shouldStop) {
      let timerId: number;

      const animate = () => {
        frame(angVel);
        timerId = requestAnimationFrame(animate);
      };
      timerId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(timerId);
    }
  }, [shouldStop]);

  return (
    <div className='flex items-center justify-center w-[100%] h-[100%]'>
      <div className='flex flex-col w-[20%] m-2'>
        <DisplayCard title='Candidate'>
          {candidate.map((opt, index) => (
            <div key={opt} className={twMerge('flex', index === count ? 'bg-amber-500' : '')}>
              <span className='mr-2'>No.{index + 1}</span>
              <span>{opt}</span>
            </div>
          ))}
        </DisplayCard>
        <DisplayCard title='Riddle'>
          {candidate.map((opt, index) => (
            <div key={opt}>
              <span>{opt}:</span>
              <span> "{selectedArr[index] || ''}" </span>
            </div>
          ))}
        </DisplayCard>
        <FormControlLabel
          control={<Checkbox value={checked} onChange={(e) => setChecked(e.target.checked)} />}
          label='Picture Mode'
        />
        <Button
          sx={{
            marginTop: '8px',
          }}
          variant='outlined'
          onClick={handleGenerate}
        >
          Generate!
        </Button>
        <Button
          sx={{
            marginTop: '8px',
          }}
          color='error'
          variant='outlined'
          onClick={() => {
            setCount(0);
            setSelectedArr([]);
          }}
        >
          Reset!
        </Button>
      </div>
      <div id='wheelOfFortune' className='flex flex-col m-2'>
        <canvas ref={canvasRef} id='wheel' width='600' height='600'></canvas>
        <Button
          id='spin'
          onClick={() => {
            console.log(angVel);
            if (!angVel) {
              setAngVel(rand(0.25, 0.45));
              setShouldStop(false);
            }
          }}
          style={{
            backgroundColor: color,
          }}
        >
          {title}
        </Button>
        <Button
          sx={{
            marginTop: '8px',
          }}
          color='error'
          variant='outlined'
          onClick={() => {
            setAngVel(0);
            setShouldStop(true);
          }}
        >
          Stop!
        </Button>
        <Button
          sx={{
            marginTop: '8px',
          }}
          color='primary'
          variant='outlined'
          onClick={() => {
            setOpen(true);
            if (selected) {
              setSelectedArr([...selectedArr, selected]);
            }
          }}
          startIcon={
            <img
              className='w-10 h-10 rounded-full'
              src='https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.18169-9/603563_412691395453640_686922867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=b9145c&_nc_ohc=RQM0R_aOmd0AX8ySToL&_nc_ht=scontent.ftpe8-1.fna&oh=00_AfAJDLDLAq_3N2FzC2aF_vE6Za26sIdGpWwsPUCQ1S1GMw&oe=657BBB7B'
            />
          }
          endIcon={
            <img
              className='w-10 h-10 rounded-full'
              src='https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.18169-9/603563_412691395453640_686922867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=b9145c&_nc_ohc=RQM0R_aOmd0AX8ySToL&_nc_ht=scontent.ftpe8-1.fna&oh=00_AfAJDLDLAq_3N2FzC2aF_vE6Za26sIdGpWwsPUCQ1S1GMw&oe=657BBB7B'
            />
          }
        >
          @@Open@@
        </Button>
      </div>
      <SimpleDialog
        open={open}
        selectedValue={checked ? <img src={`/${selected}.jpeg`} /> : selected || ''}
        onClose={() => {
          setOpen(false);
          setCount((c) => c + 1);
        }}
      />
    </div>
  );
};

export default RandomPage;
