package com.teachMng.onlineTeach.action;

import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.stereotype.Component;
import org.springframework.test.web.client.ResponseActions;

import com.opensymphony.xwork2.ActionSupport;
import com.teachMng.onlineTeach.model.Student;
import com.teachMng.onlineTeach.model.Teacher;
import com.teachMng.onlineTeach.model.exercise.CompletionExercise;
import com.teachMng.onlineTeach.model.exercise.ExerciseSet;
import com.teachMng.onlineTeach.model.exercise.JudgeExercise;
import com.teachMng.onlineTeach.model.exercise.QuestionExercise;
import com.teachMng.onlineTeach.model.exercise.SelectionExercise;
import com.teachMng.onlineTeach.service.ICompletionExerciseService;
import com.teachMng.onlineTeach.service.IExerciseSetService;
import com.teachMng.onlineTeach.service.IJudgeExerciseService;
import com.teachMng.onlineTeach.service.IQuestionExerciseService;
import com.teachMng.onlineTeach.service.ISchoolClassService;
import com.teachMng.onlineTeach.service.ISelectionExerciseService;
import com.teachMng.onlineTeach.service.IStudentService;
import com.teachMng.onlineTeach.service.ITeacherService;

@Component("exsGoAction")
public class ExerciseGoAction extends ActionSupport implements ServletResponseAware{
	private IExerciseSetService ess;
	private ITeacherService tService;
	private ISchoolClassService sClassService;
	private IStudentService studentService;
	private ISelectionExerciseService selService;
	private ICompletionExerciseService cplService;
	private IJudgeExerciseService jugService;
	private IQuestionExerciseService qusService;
	private HttpServletResponse response;
	private String teacherId;
	private String classId;
	private String exs;
	
	/**
	 * 学生获取自己的练习题
	 */
	public void getMyExercises(){
		List<ExerciseSet> esList = ess.allExerciseSet();
	}
	public void generateExerciseSet(){
		
	}
	/**
	 * 教师给班级分配题目集
	 		teacherId	:	教师的编号
			classId		:	班级编号,
			exs			:	10:selection,14:completion,12:judge,15:answer
	 * @throws IOException 打印消息的时候如果出错会抛出异常
	 */
	public void assignment() throws IOException{
		if(teacherId!=null&&!teacherId.equals("") && classId!=null&&!classId.equals("") && exs!=null&&!exs.equals("")){
			int teacherIdInt = Integer.parseInt(teacherId);
			int classIdInt = Integer.parseInt(classId);
			String[] exsArray = exs.split(",");
			
			//试题类型数组
			String[] exsTypeArray = new String[exsArray.length];
			//试题ID数组
			int[] exIds = new int[exsArray.length];
			
			for(int i=0; i<exsArray.length; i++){
				String[] temps = exsArray[i].split(":");
				exIds[i] = Integer.parseInt(temps[0]);
				exsTypeArray[i] = temps[1];
			}
			List<Student> stuList = sClassService.getStudents(classIdInt);
			Iterator<Student> stuItor = stuList.iterator();
			Teacher t = tService.findById(teacherIdInt);
			ExerciseSet es = null;
			//先把所有的题目拿出来
			List<SelectionExercise> seList = new LinkedList<SelectionExercise>();
			List<CompletionExercise> cplList = new LinkedList<CompletionExercise>();
			List<JudgeExercise> jugList = new LinkedList<JudgeExercise>();
			List<QuestionExercise> qusList = new LinkedList<QuestionExercise>();
			for(int i=0; i< exsTypeArray.length; i++){
				if(exsTypeArray[i]!=null){
					if(exsTypeArray[i].equals("selection")){
						SelectionExercise se = selService.findById(exIds[i]);
						seList.add(se);
					} else if (exsTypeArray[i].equals("completion")){
						CompletionExercise cp = cplService.findById(exIds[i]);
						cplList.add(cp);
					} else if (exsTypeArray[i].equals("judge")){
						JudgeExercise je = jugService.findById(exIds[i]);
						jugList.add(je);
					} else if (exsTypeArray[i].equals("answer")){
						QuestionExercise qe = qusService.findById(exIds[i]);
						qusList.add(qe);
					}
				}
			}
			//每个学生
			while(stuItor.hasNext()){
				es = new ExerciseSet();
				es.setFounder(t);
				es.setStudent(stuItor.next());
				es.setSelectionExercise(seList);
				es.setQuestionExercise(qusList);
				es.setJudgeExercise(jugList);
				es.setCompletionExercise(cplList);
				boolean isOk = ess.save(es);
System.out.println("save ExerciseSet is: " + isOk);
				String sucFaild = isOk?"成功！":"失败！";
				response.getWriter().print("oktip:"+isOk+",tip:试卷发布"+sucFaild);
			}
		}
	}

	public IExerciseSetService getEss() {
		return ess;
	}
	@Resource(name="exerciseSetService")
	public void setEss(IExerciseSetService ess) {
		this.ess = ess;
	}
	public ITeacherService gettService() {
		return tService;
	}
	@Resource(name="teacherService")
	public void settService(ITeacherService tService) {
		this.tService = tService;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	public String getClassId() {
		return classId;
	}
	public void setClassId(String classId) {
		this.classId = classId;
	}
	public String getExs() {
		return exs;
	}
	public void setExs(String exs) {
		this.exs = exs;
	}
	public ISchoolClassService getsClassService() {
		return sClassService;
	}
	@Resource(name="schoolClassService")
	public void setsClassService(ISchoolClassService sClassService) {
		this.sClassService = sClassService;
	}
	public IStudentService getStudentService() {
		return studentService;
	}
	@Resource(name="studentService")
	public void setStudentService(IStudentService studentService) {
		this.studentService = studentService;
	}
	public ISelectionExerciseService getSelService() {
		return selService;
	}
	@Resource(name="selectionExerciseService")
	public void setSelService(ISelectionExerciseService selService) {
		this.selService = selService;
	}
	public ICompletionExerciseService getCplService() {
		return cplService;
	}
	@Resource(name="completionExerciseService")
	public void setCplService(ICompletionExerciseService cplService) {
		this.cplService = cplService;
	}
	public IJudgeExerciseService getJugService() {
		return jugService;
	}
	@Resource(name="judgeExerciseService")
	public void setJugService(IJudgeExerciseService jugService) {
		this.jugService = jugService;
	}
	public IQuestionExerciseService getQusService() {
		return qusService;
	}
	@Resource(name="questionExerciseService")
	public void setQusService(IQuestionExerciseService qusService) {
		this.qusService = qusService;
	}
	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		this.response = arg0;
	}
}