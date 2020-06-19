import React, { useEffect, useState, useRef } from "react";
import VAL from '../state/const';
import { useSelector, useDispatch } from 'react-redux';
import LapIcon from '../element/icon-lap';
import SkipsIcon from '../element/icon-skips';
import UpgradesIcon from '../element/icon-upgrades';
import OverallIcon from '../element/icon-overall';
import Actions from '../state/action';
import { MdMenu, MdClose, MdLoop, MdLightbulbOutline } from 'react-icons/md';

export default () => {
	const node = useRef();
	const [open, setOpen] = useState(false);

	const handleClickOutside = e => {
		if (node.current.contains(e.target))
			return;
		setOpen(false);
	};

	useEffect(() => {
		if (open) document.addEventListener("mousedown", handleClickOutside);
		else document.removeEventListener("mousedown", handleClickOutside);
		return () => { document.removeEventListener("mousedown", handleClickOutside); };
	}, [open]);

	//const refreshable = useSelector(state => state.settings.refreshable);
	const overall = useSelector(state => state.settings.overall);
	const skips = useSelector(state => state.settings.skips);
	const upgrades = useSelector(state => state.settings.upgrades);
	const lap = useSelector(state => state.settings.lap);
	const lapText = VAL.Setting.Lap.map(l => l.name);
	const theme = useSelector(state => state.settings.dark);
	const debug = useSelector(state => state.settings.debugMode);
	const debugInfo = useSelector(state => state.settings.debugInfo);

	const dispatch = useDispatch();
	const toggleTheme = ()=>dispatch(Actions.toggleTheme());
	const reload = () => dispatch(Actions.markLoading());
	const toggleDebugInfo = () => {
		dispatch(Actions.toggleDebugInfo());
		dispatch(Actions.updateTable());
		dispatch(Actions.updateCtxPan());
	};
	const cycleLap = () => {
		dispatch(Actions.cycleLapSetting());
		dispatch(Actions.updateTable());
		dispatch(Actions.updateCtxPan());
	};
	const toggleSkips = () => {
		dispatch(Actions.toggleSkipsSetting());
		if (!overall) {
			dispatch(Actions.updateTable());
			dispatch(Actions.updateCtxPan());
		}
	};
	const toggleUpgrades = () => {
		dispatch(Actions.toggleUpgradesSetting());
		if (!overall) {
			dispatch(Actions.updateTable());
			dispatch(Actions.updateCtxPan());
		}
	};
	const toggleOverall = () => {
		dispatch(Actions.toggleOverallSetting());
		dispatch(Actions.updateTable());
		dispatch(Actions.updateCtxPan());
	};

	return (
		<div className="settings-menu" ref={node}>
			<button className="icon dropdown-button" onClick={e => setOpen(!open)}>{open?<MdClose className="warning"/>:<MdMenu/>}</button>
			<ul className={"dropdown-menu".concat(open?" dropdown-show":"")}>
				<li onClick={toggleOverall} className={!overall?'disabled':''}><button className="icon"><OverallIcon/></button> {overall?'Overall':'Category'} Ranking</li>
				<li onClick={toggleSkips} className={overall?'disabled':''}><button className="icon"><SkipsIcon/></button> {skips?'':'No '}Skips</li>
				<li onClick={toggleUpgrades} className={overall?'disabled':''}><button className="icon"><UpgradesIcon/></button> {upgrades?'':'No '}Upgrades</li>
				<li onClick={cycleLap}><button className="icon"><LapIcon/></button> {lapText[lap]}</li>
				<li onClick={toggleTheme} className="small"><button className="icon"><MdLightbulbOutline className={!theme?'disabled':''}/></button> {theme?'Dark':'Light'}</li>
				<li onClick={reload} className="small"><button className="icon"><MdLoop/></button> Reload</li>
				{ debug && <li onClick={toggleDebugInfo} className="small"><button>{debugInfo ? 'ON' : 'OFF'}</button> Debug Info</li> }
			</ul>
		</div>
	);
}