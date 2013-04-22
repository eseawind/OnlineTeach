package com.teachMng.onlineTeach.model;

import static org.junit.Assert.*;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

public class CoursePlanItemTest {
	static SessionFactory sf = null;
	@BeforeClass
	public static void beforeC() {
		sf = new AnnotationConfiguration().configure().buildSessionFactory();
	}
	@AfterClass 
	public static void afterC() {
		sf.close();
	}
	@Test
	public void testSave() {
		ClassRoom cr = new ClassRoom();
		cr.setCrName("����");
		cr.setCrType(1);
		
		Teacher teacher = new Teacher();
		teacher.setTeacName("����");
		
		Major major = new Major();
		major.setMajorName("�������");
		
		
		SchoolClass sc = new SchoolClass();
		sc.setScName("113-2");
		sc.setMajor(major);
		
		Session se = sf.openSession();
		se.beginTransaction();
		se.save(sc);
		se.getTransaction().commit();
		se.close();
		Course course = new Course();
		course.setCourseName("��ѧӢ��");
		course.setCourseDesc("����һ�ű��޿�");
		
		CoursePlanItem cpi = new CoursePlanItem();
		cpi.setCpParagraph(18);
		cpi.setCpState(1);
		cpi.setClassRoom(cr);
		course.setCoursePlanItem(cpi);
		cpi.setCourse(course);
		cpi.setTeacher(teacher);
		cpi.setSchoolClass(sc);
		
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		s.save(cpi);
		s.getTransaction().commit();
	}
	@Test
	public void testGet() {
		CoursePlanItem cpi = null;
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		cpi = (CoursePlanItem) s.get(CoursePlanItem.class, 1);
		System.out.println("�ڣ�" + cpi.getCpParagraph() + "���ң�" + cpi.getClassRoom().getCrName() + 
				"�γ����ƣ�" + cpi.getCourse().getCourseName() + "��ʦ���ƣ�" + cpi.getTeacher().getTeacName());
	}
}
